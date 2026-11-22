const MarkdownIt = require('markdown-it');

// For math: $a\times b\eq 10$
// Specific image size: ![image](image.png =100x100)
const Imsize = require('markdown-it-imsize');
/* Footnote support.
Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

    Subsequent paragraphs are indented to show that they
belong to the previous footnote.
*/
const Footnote = require('markdown-it-footnote');
// ==Highlight==
const Mark = require('markdown-it-mark');
const TOC = require('markdown-it-table-of-contents');
const Anchor = require('markdown-it-anchor');
const MergeCells = require('markdown-it-merge-cells');
// @[url](videourl)
// @[youtube](https://youtube.com/watch?v=xxx)
// @[pdf](https://foo.com/bar.pdf)
const { Media } = require('./markdown-it-media');
const { default: Katex } = require('./markdown-it-katex');
const { xssProtector } = require('./markdown-it-xss');

class Markdown extends MarkdownIt {
  constructor() {
    super({
      linkify: true,
      html: true,
    });
    this.linkify.tlds('.py', false);
    this.use(Media);
    this.use(Imsize);
    this.use(Footnote);
    this.use(Mark);
    this.use(Anchor);
    this.use(TOC);
    this.use(Katex);
    this.use(MergeCells);
    this.use(xssProtector);
  }
}

const md = new Markdown();

function plugin(func, ...args) {
  md.use(func, ...args);
}

// 从别处（网页 / 其他 OJ 导出的 HTML）粘贴过来的题面，常见「多转义一层」的实体，
// 例如 0<=a&amp;#44;b<=10000000 会被原样显示成 &#44;。这里统一解一层。
function normalizeEscapedEntities(text) {
  return String(text ?? '').replace(/&amp;#(\d{1,6});/g, '&#$1;');
}

function render(text) {
  return md.render(normalizeEscapedEntities(text));
}

function renderInline(text) {
  return md.renderInline(normalizeEscapedEntities(text));
}

module.exports = {
  md, plugin, render, renderInline,
};
