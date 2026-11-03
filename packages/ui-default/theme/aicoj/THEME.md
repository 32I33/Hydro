# AICOJ 主题规范 · Pixel Arcade

> 这份文档描述 **当前线上真正跑着的界面**（`http://localhost:8080`），不是设计稿也不是规划。
> 权威数值在 [`tokens.css`](./tokens.css)；本文解释「为什么这么定、什么时候该用哪一个、改的时候别踩什么」。
> 位置：`D:\ACAI\Hydro\packages\ui-default\theme\aicoj\THEME.md`
> 最后校准：2026-11-03，逐条对照 CSS 原文 + 1280×800 实机截图核过。

---

## 0. 一句话

浅色纸面上的**像素街机**：暖白纸 + 2px 墨线 + 无模糊硬投影 + 一枚橙色主色；等宽字体负责所有「机器说的话」（编号、计数、时间、状态、标签）。受众是 6–18 岁学编程的学生，要**清楚**、有一点**游戏感**，但**不幼稚**。

来源：Stitch 项目「Pixel Code Arcade POC」（`projects/4494752139354334877`），色值取自设计稿 tailwind 配置，未凭感觉改。

---

## 1. 七条原则

1. **硬边优先**：卡片、按钮、输入框一律 `2px solid var(--ax-line)`。不用 1px 灰边，不用模糊阴影。
2. **硬投影代替柔光**：`box-shadow: Npx Npx 0 var(--ax-line)`，纯色偏移、零模糊。悬浮时向左上位移 1px 并加一档阴影 = 「抬起来」；按下时向右下位移 2px、阴影归零 = 「压下去」。
3. **纸面底**：页面底 `#faf9f4`，卡片纯白，分区用 `--ax-surface-2/3`。整站不允许出现渐变大背景或照片底。
4. **一格橙色**：`--ax-primary-bright`（`#ff5e1a`）只给「当前状态 / 主操作 / 关键数字」，同一屏不超过 3 处大面积橙。
5. **等宽字 = 机器语言**：编号、计数、时间、内存、标签、小标签一律 `--ax-font-mono` + 大写 + 字距，正文永远不用等宽。
6. **像素只做点缀**：吉祥物 28–60px（`image-rendering: pixelated`）、网格纸 26px 一格。不做大面积像素纹理。
7. **中文优先排版**：正文 15px / 行高 1.65；标题字 Space Grotesk 只吃西文与数字，中文回落到 PingFang SC / 微软雅黑。

---

## 2. 颜色

### 2.1 纸面与墨（占比约 80%）

| Token | 值 | 用在哪 |
|---|---|---|
| `--ax-bg` | `#faf9f4` | 页面底、搜索框内底 |
| `--ax-surface` | `#ffffff` | 卡片、面板、输入框、下拉菜单 |
| `--ax-surface-2` | `#f6f4ee` | 分区标题条、工具条、卡内浅块、hover 底 |
| `--ax-surface-3` | `#eeebe1` | 徽章底、次级分区 |
| `--ax-surface-4` | `#d9d4c6` | 虚线分隔、滚动条滑块、表格行线 |
| `--ax-ink` | `#141b2d` | 正文、边框、标题 |
| `--ax-ink-soft` | `#293043` | 次级标题、表头文字 |
| `--ax-text-2` | `#5b4138` | 说明文字、AI 正文 |
| `--ax-muted` | `#8f7066` | 元信息、占位符、未激活 tab |
| `--ax-line` | `#141b2d` | 所有 2px 描边 |
| `--ax-line-soft` | `#e3beb3` | 极少数需要弱化描边处 |

### 2.2 主色（占比约 12%）

| Token | 值 | 用在哪 |
|---|---|---|
| `--ax-primary-bright` | `#ff5e1a` | 主按钮底、激活导航项、进度条、eyebrow、聚焦边框 |
| `--ax-primary` | `#aa3600` | 链接、编号、主按钮 hover 底 |
| `--ax-primary-soft` | `#ffdbcf` | 主色 hover 底、选择高亮、聚焦光晕 |
| `--ax-primary-wash` | `#551700` | 深橙文字（配黄色底时用） |

### 2.3 语义色（占比约 8%）

| 含义 | 底 | 字/边 |
|---|---|---|
| 通过 / AC | `--ax-mint` `#5ffdb7` | `--ax-green` `#006c47` |
| 通过（浅） | `--ax-green-soft` `#5cfab5` | `--ax-green` |
| 警告 / 等待 | `--ax-yellow-soft` `#ffdf92` | `--ax-primary-wash` |
| 失败 / WA | `--ax-red-soft` `#ffdad6` | `--ax-red` `#ba1a1a` |

### 2.4 禁止项

- ❌ Hydro 默认蓝 `#5f9fd6` / `#78a7ff`；❌ 旧粉色 `#ed5f82` / `#df6589`；❌ 浅蓝 `#9ae3f3`
- ❌ 冷紫 bleed（`#faf8ff` / `#f2f3ff` 一类底色）、雪山照片背景
- ❌ 纯黑 `#000`、模糊阴影（`box-shadow` 带 blur）、`border-radius > 18px`（除胶囊 999px）
- ❌ 大面积渐变、玻璃拟态、霓虹光晕

---

## 3. 字体

| 角色 | 字体 | 典型规格 |
|---|---|---|
| 标题 / 数字强调 | `Space Grotesk`（`--ax-font-head`） | 700–800，字距 `-0.01 ~ -0.02em` |
| 正文 / 表单 | `Plus Jakarta Sans`（`--ax-font-body`） | 400–600，15px / 1.65 |
| 机器语言（编号、时间、状态、标签） | `Space Mono`（`--ax-font-mono`） | 700，大写，字距 `.04 – .1em`，10–12px |

- 字体通过 Google Fonts 在 `templates/layout/html5.html:26` 引入（`display=swap`）。
- 代码块 / Monaco 用 `--code-font-family`（用户在偏好里选的那套等宽字体）。
- **不要**用等宽字排正文；**不要**给中文标题加字距或全大写。

实测字号：

| 元素 | 字号 |
|---|---|
| 页面主标题 `.ax-page-title` | 30px / 800 / -0.02em |
| 分区标题 `.section__header`、卡片标题 | 14–15px / 700 |
| 正文 | 15px（表格内 13px，控制台内 12–12.5px） |
| 元信息 / 徽章 | 9–11px 等宽大写 |

---

## 4. 形状、阴影、动效

**圆角**：`6px`（徽章、小按钮）/ `10px`（按钮、导航项）/ `14px`（卡片、面板、分区）/ `18px`（极少，大容器）/ `999px`（胶囊、标签）。

**阴影（硬投影，1–4 档）**：

```css
--ax-shadow-1: 2px 2px 0 var(--ax-line);  /* 标签、小按钮、tab */
--ax-shadow-2: 3px 3px 0 var(--ax-line);  /* 头像、图章、主按钮 */
--ax-shadow-3: 4px 4px 0 var(--ax-line);  /* 标准卡片、分区、面板 */
--ax-shadow-4: 5px 5px 0 var(--ax-line);  /* 浮层、卡片 hover */
```

**动效**：统一 `transition: ... .12s ease`，只动 `transform` / `box-shadow` / `background`。

| 状态 | 写法 |
|---|---|
| hover 抬起 | `transform: translate(-1px, -1px)` + 阴影加一档 |
| 按下压平 | `transform: translate(2px, 2px)` + `box-shadow: none` |
| 激活选中 | 换底色（墨底白字 / 橙底白字 / `--ax-primary-soft`），不再位移 |

⚠️ 目前**没有** `prefers-reduced-motion` 兜底，属待补债务。

---

## 5. 间距与栅格

| 项 | 值 |
|---|---|
| 顶栏高 `--ax-nav-h` | `64px` |
| 页面左右留白 `--ax-gutter` | `24px`（`.ax-camp` 用 22px） |
| 页面最大宽 | 1560px（列表页）/ 1600px（顶栏） |
| 分区之间 | `margin-bottom: 20px` |
| 卡片网格 gap | `14px`，`repeat(3, minmax(0,1fr))`，≤1240px 降两列 |
| 分区标题条 padding | `12px 18px`；分区正文 `18px` |
| 卡片内 padding | `14px` |
| 表格行 padding | `10px`，行线 `1px solid var(--ax-surface-4)` |

响应式断点只有三档：`1240px`（卡片两列）、`1180px`、`900px`（顶栏收成横向滚动、隐藏副标与 AC 药丸）。

---

## 6. 组件规格

| 组件 | 关键规格 |
|---|---|
| 主按钮 `.ax-btn--primary` | `padding 7px 14px`、13px/700、`2px` 墨边、橙底白字、`shadow-2`；hover 转深橙 `--ax-primary` + `shadow-3` |
| 次按钮 `.ax-btn` | 白底墨字 + `shadow-1`；hover `--ax-surface-2` + 左上位移 + `shadow-2` |
| 工具按钮 `.ax-tool` | 高 32px、等宽 11px、`::before` 一个 6px 橙色小方块；激活态 = `--ax-primary-soft` + 压平 |
| 胶囊 `.ax-pill` | `padding 4px 11px`、12.5px/600、`999px`；`.is-active` 变墨底白字；计数后缀 10px 等宽 70% 透明 |
| 题目标签 `.problem__tag-link` | `1.5px` 墨边胶囊、10.5px 等宽 700、纸白底；hover `--ax-primary-soft` |
| 难度徽章 `.ax-diff--1..5` | 5 档：mint / green-soft / yellow-soft / primary-soft / red-soft，边与字取对应深色 |
| 卡片 `.ax-card` | `14px` 内距、`radius 14`、`shadow-3`；hover `shadow-4` + 左上 1px |
| 列表 `.ax-plist` | 白卡包住整张表；顶部 `.ax-plist__bar` 用 `--ax-surface-2` + 等宽大写 11px + 底 2px 墨线 |
| 表格 `.ax-table` | 隐藏 `thead`，行高 10px 内距，偶数行 `rgba(242,243,255,.5)`（⚠️ 待换成暖调），hover `--ax-surface-2` |
| 状态列 | 20px 圆形章：通过 mint / 失败 `--ax-red-soft` / 进行中 `--ax-primary-soft`，2px 墨边 |
| 通过率条 `.ax-rate__bar` | 高 8px、`2px` 墨边、胶囊；填充 ≥60% 绿 / ≥30% 黄 / 其余橙 |
| 分页 `.pager` | 底部浅底条 + `2px` 顶墨线；页码 32px 方块、等宽 12px/700；当前页**墨底白字** |
| 输入框 | `2px` 墨边、`radius 6`、白底；聚焦 = 橙边 + `0 0 0 3px var(--ax-primary-soft)` 硬环 |
| 下拉框 `select` | 同上 + 两个 5px 小三角拼出的自绘箭头，不依赖系统外观 |
| 顶栏 `.nav` | `sticky top 0`、高 64px、白底、底部 `2px` 墨线、z-index 500（Hydro 默认 `fixed`，这里改掉了） |
| 品牌块 `.ax-brand` | 墨边 + `shadow-1`，内嵌 28px 像素吉祥物；`AICOJ` 17px/800 橙色 + `Pixel Arcade` 9px 等宽大写副标 |
| 导航项 `.ax-nav__item` | `8px 14px`、600、`2px` 透明边；hover 浅底加墨边；`.nav--active` = 橙底白字 + `shadow-2` |
| 用户菜单 `.ax-user-menu` | 宽 340px、`shadow-4`、头部浅底卡（44px 头像 + 16px 名 + 11px 等宽 UID + 角色胶囊） |
| 页脚 `.footer` | 白底、顶部 `2px` 墨线 + 6px 像素条（`repeating-linear-gradient` 26px 橙 + 6px 墨），标题等宽 12px 大写 + 8px 橙色方块 |
| AI 卡 `.ax-ai-card` / 提示卡 `.ax-hint` | 白卡 + `shadow-3`；头部 34–36px 像素头像 + 等宽小标 + 右侧绿/橙胶囊；头部下用 `2px dashed` 分隔 |
| 三层提示 `.ax-hint__level` | 胶囊组，激活 = 墨底白字；回答块浅底 + `1.5px` 墨边，徽章 `--ax-primary-soft` |
| 控制台 `.ax-console` | 高 222px（`flex: 0 0 222px`）、白底、头部浅底 + `2px` 底线；tab 等宽 11px/700，激活 = 白底 + `shadow-1` |
| 自测面板 `.ax-pt` | 两列；输入框固定 92px 高、结果框 96px 上限；结论用色块（通过 green-soft / 失败 red-soft / 运行中 yellow-soft） |
| 网格纸（沉浸页 / 个人主页） | 两条 `repeating-linear-gradient`（0deg + 90deg），2px 线、每 26px 一格、`rgba(20,27,45,.04)` |
| 滚动条 | 12px、浅底槽、`--ax-surface-4` 滑块 + `2px` 浅底边、胶囊 |

---

## 7. 页面骨架模式

| 类型 | 骨架 | 例子 |
|---|---|---|
| 列表工作区 | 页头卡（eyebrow + 标题 + 副标 + 右侧统计小块）→ 搜索条 → 筛选胶囊 → 卡片包住的表格 → 分页 | 题库、训练、比赛、功课、评测记录、排名 |
| 详情页 | 面包屑 `.ax-crumb` → 标题行（徽章 + 标题 + 收藏 + 提交按钮）→ tabs（真链接）→ 左正文 / 右 `--ax-side` 信息卡 | 题目详情 |
| 沉浸页 | 网格纸背景 + 居中 372px 白卡 + 品牌吉祥物，用于登录/注册/找回密码 | `layout--immersive` |
| 编程工作区 | 固定 `100vh` 双列：左题面 + 三层提示（内部滚动）、右 Monaco（填满）+ 底部 222px 控制台；`html:has(.ax-submit)` 锁滚动 | 在线编程页 |
| 用户主页 | 网格纸白卡头部（像素头像 + 名称 + 联系方式胶囊）→ 下方卡片列表 | 用户详情 |
| 管理页 | 浅色分区卡 + 数据表；权限矩阵表头改墨底白字 | 管理后台、学园控制面板 |

---

## 8. 文案与信息架构

顶栏主链顺序（`templates/partials/nav.html`）：`首页 · 题库 · 训练 · 比赛 · 功课` + `AI 智能助教 · 成长档案`，右侧 `AC 药丸 · 头像菜单`。

- **学园开关**：`{% set axAcademyOn = model.system.get('ui-default.academyMode') != false %}`；关闭时隐藏 `training_main / contest_main / homework_main`（训练 / 比赛 / 功课），不显示空壳入口。
- 术语：题库、训练、比赛、功课、评测记录、排名、成长档案、AI 智能助教。**不要**用「域 / Domain」「作业」这类 Hydro 原生词（`domain_dashboard` 目前仍叫「管理域」，属待改项）。
- 语气：动词开头、句子短、给结论不给口号；面向学生用「你」。不用感叹号堆情绪，不写「轻松搞定」这类空话。
- 判题事实来自 Hydro，AI 只做解释：界面上 AI 的措辞必须是「建议 / 解释 / 可能的原因」，不能写「判定 / 改分」。

---

## 9. 实现约定（改之前必读）

**文件分层**（同目录，按加载顺序）：

| 文件 | 职责 |
|---|---|
| `tokens.css` | 唯一变量源；顺带覆盖 Hydro 的 `--primary-color` 等与 Mantine 变量 |
| `base.css` | 底色、`#panel`、字体、链接、`.section`、滚动条、页脚 |
| `nav.css` | 顶栏、品牌、导航项、AC 药丸、头像与用户菜单 |
| `components.css` | 按钮、搜索条、胶囊、列表/表格、分页、原生控件收口 |
| `problem.css` | 题目详情页（标题行、tabs、标签、侧栏、样例） |
| `camp.css` | 训练/作业/比赛的页头、卡片网格、比赛 hero |
| `pages.css` | 其余页面 + 在线编程页 + 提示卡 + 沉浸页 + 用户页（最大，1500+ 行） |

**加载顺序**：`theme/default.js:29-35` 依次 import（位于 `dark.styl` 之后）；随后才 `require.context` 加载所有 `*.page.styl`。这就是**所有选择器都写 `html body` 前缀**的原因——否则会被后加载的页面样式压回去。

**缓存**：DEV 环境样式表链接写死在 `templates/layout/html5.html:48`（`?v=N`）。**每次改 CSS 必须手工 bump**，否则浏览器继续用旧表。`default.theme.js` 还会额外注入一份旧副本 `?ed6506`，也是“改了没生效”的常见误判来源。

**构建与验证**：

```powershell
cd D:\ACAI\Hydro
yarn build:ui                      # 约 14s，产出 public/theme-4.58.5.css

powershell -ExecutionPolicy Bypass -File D:\ACAI\local\stop-dev.ps1
Start-Process powershell -ArgumentList '-ExecutionPolicy','Bypass','-File','D:\ACAI\local\start-dev.ps1','-SkipDb','-Dev'
```

- 只改 CSS：构建 + bump 版本号即可，不必重启（模板改动才要重启）。
- 验收方式：1280×800 截图 + 用 DevTools 读 computed style（颜色/字号/边框/圆角），不要只看“看起来对”。
- 编辑含中文的源文件请用 Python `io.open(encoding='utf-8')`，PowerShell 5.1 会把中文写成乱码（本项目已经踩过两次，`index.ts` 和 `tokens.css` 都留下过痕迹）。

---

## 10. 已知债务

1. `default.theme.js` 仍注入 `/theme-4.58.5.css?ed6506` 旧副本，与新表并存（靠 `!important` 与显式链接压过，未清理）。
2. `components.css:249` 斑马纹 `rgba(242,243,255,.5)` 是冷紫调残留，应换暖色。
3. `tokens.css` 文件头注释、`templates/layout/html5.html:8` 的 Jinja 注释都是早期 PowerShell 写入的 mojibake（值本身正常，纯注释）。
4. 没有 `prefers-reduced-motion` 兜底。
5. `.data-table:not(.ax-table)` 与 `.ax-table` 两套表格样式并存，靠 `:not()` 分工，新增表格时容易选错。
6. 深色版**未做**：`html5.html:8` 强制 `theme = 'light'`，`--ax-*` 没有暗色覆盖。
7. 导航 `管理域` 尚未按「学园」改名；`record_main` 标签是「记录」而非「评测记录」。

---

## 11. 改 UI 的检查清单

- [ ] 新颜色是不是只在 `tokens.css` 里加变量，而不是在页面里写死 `#xxxxxx`
- [ ] 描边是不是 `2px`+`--ax-line`，阴影是不是无模糊硬投影
- [ ] 新增选择器有没有 `html body` 前缀（否则会被 `*.page.styl` 覆盖）
- [ ] 中文有没有走 `--ax-font-body`，机器信息有没有走 `--ax-font-mono`
- [ ] 橙色是否只出现在「当前/主操作/关键数字」
- [ ] 900px 与 1240px 两个断点是否还成立
- [ ] `?v=` 有没有 bump，`yarn build:ui` 有没有跑
- [ ] 截图 + computed style 双验证，深浅色（当前仅浅色）是否自洽
- [ ] 有没有把 Hydro 原生蓝/粉/紫漏出来（表格、按钮、链接、checkbox、编辑器）
