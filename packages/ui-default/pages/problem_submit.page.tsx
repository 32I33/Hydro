import $ from 'jquery';
import Editor from 'vj/components/editor';
import { renderLanguageSelect } from 'vj/components/languageselect';
import { NamedPage } from 'vj/misc/Page';
import { getAvailableLangs } from 'vj/utils';

/**
 * Hydro 的语言键（cc / py.py3 / nodejs …）和 Monaco 的 languageId 不是一套，
 * 对不上时 Monaco 会退化成 plaintext —— 表现就是「代码没有高亮」。
 * 这里显式做一次映射；没列到的键按同名处理，同名也没有就是纯文本。
 */
const MONACO_LANGS: Record<string, string> = {
  c: 'c',
  cc: 'cpp',
  cpp: 'cpp',
  cxx: 'cpp',
  cs: 'csharp',
  csharp: 'csharp',
  go: 'go',
  golang: 'go',
  java: 'java',
  js: 'javascript',
  javascript: 'javascript',
  nodejs: 'javascript',
  kt: 'kotlin',
  kotlin: 'kotlin',
  lua: 'lua',
  pas: 'pascal',
  pascal: 'pascal',
  php: 'php',
  py: 'python',
  py2: 'python',
  py3: 'python',
  python: 'python',
  python3: 'python',
  rb: 'ruby',
  ruby: 'ruby',
  rs: 'rust',
  rust: 'rust',
  swift: 'swift',
  ts: 'typescript',
  typescript: 'typescript',
  // Monaco 没有 shell 的词法，退回纯文本（上游行为）
  bash: 'plaintext',
  sh: 'plaintext',
};

export function monacoLangOf(langKey: string): string {
  const base = String(langKey || '').split('.')[0].toLowerCase();
  if (MONACO_LANGS[base]) return MONACO_LANGS[base];
  return /^[a-z][a-z0-9-]*$/.test(base) ? base : 'plaintext';
}

const page = new NamedPage(['problem_submit', 'contest_detail_problem_submit', 'homework_detail_problem_submit'], async () => {
  const { config } = UiContext.pdoc;
  if (config.type === 'submit_answer') {
    $('[name="lang"]').val('_');
    return;
  }
  const availableLangs = getAvailableLangs(config.langs);
  const mainLangs = {};
  const preferences = [UserContext.codeLang || ''];
  for (const key in availableLangs) {
    if (config.langs && !config.langs.filter((i) => i === key || i.startsWith(`${key}.`)).length) continue;
    if (window.LANGS[key].pretest === preferences[0]) preferences.push(key);
    if (!key.includes('.')) mainLangs[key] = window.LANGS[key].display;
    else {
      const a = key.split('.')[0];
      mainLangs[a] = window.LANGS[a].display;
    }
  }
  for (const key in availableLangs) {
    if (config.langs && !config.langs.filter((i) => i === key || i.startsWith(`${key}.`)).length) continue;
    if (typeof window.LANGS[key]?.pretest === 'string' && window.LANGS[key].pretest.split('.')[0] === preferences[0].split('.')[0]) {
      preferences.push(key);
    }
  }

  renderLanguageSelect(
    document.getElementById('codelang-selector'),
    '[name="lang"]',
    availableLangs,
    mainLangs,
    preferences,
  );

  const code = document.querySelector('textarea[name="code"]') as HTMLTextAreaElement | null;
  if (!code) return;
  const select = document.querySelector('[name="lang"]') as HTMLSelectElement | null;
  const selected = select?.value || UserContext.codeLang || 'cpp';
  const editor = new Editor($(code), {
    language: monacoLangOf(selected),
    autoResize: false,
    autoLayout: true,
    lineNumbers: 'on',
    // 默认灵敏度在长代码里滚一格几乎不动，这里调高一点
    mouseWheelScrollSensitivity: 3,
  });

  // 切语言：把当前 model 的 languageId 一起换掉，否则高亮会停在打开页面时的语言上。
  // 注意：真正可见的下拉是 React 组件（没有 name），它稍后才把值写回 [name="lang"]，
  // 所以这里直接读可见下拉，不依赖那个隐藏 select 的时机。
  const langHost = document.getElementById('codelang-selector');
  if (select && langHost) {
    const visibleSelects = () => Array.from(langHost.querySelectorAll('select')) as HTMLSelectElement[];
    const currentKey = () => {
      const sels = visibleSelects();
      if (sels.length >= 2) return `${sels[0].value}.${sels[1].value}`;
      return sels[0]?.value || select.value;
    };
    let lastLang = monacoLangOf(currentKey());
    const applyLang = async () => {
      const next = monacoLangOf(currentKey());
      if (next === lastLang) return;
      lastLang = next;
      const model = editor.model;
      if (!model) return;
      try {
        const { load } = await import('vj/components/monaco/loader');
        const { monaco } = await load([next]);
        monaco.editor.setModelLanguage(model, next);
      } catch (e) {
        console.warn('[problem_submit] switch monaco language failed:', e);
      }
    };
    langHost.addEventListener('change', () => {
      setTimeout(applyLang, 30);
    });
  }
});

export default page;
