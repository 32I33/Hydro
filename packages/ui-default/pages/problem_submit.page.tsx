import $ from 'jquery';
import Editor from 'vj/components/editor';
import { renderLanguageSelect } from 'vj/components/languageselect';
import { NamedPage } from 'vj/misc/Page';
import { getAvailableLangs } from 'vj/utils';

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
  const selected = (document.querySelector('[name="lang"]') as HTMLSelectElement | null)?.value
    || UserContext.codeLang
    || 'cpp';
  const base = selected.split('.')[0];
  const monacoLang = ({
    bash: 'plaintext',
    sh: 'plaintext',
    python3: 'python',
    py: 'python',
    nodejs: 'javascript',
    javascript: 'javascript',
  } as Record<string, string>)[base] || base;
  new Editor($(code), {
    language: monacoLang,
    autoResize: false,
    autoLayout: true,
    lineNumbers: 'on',
  });
});

export default page;
