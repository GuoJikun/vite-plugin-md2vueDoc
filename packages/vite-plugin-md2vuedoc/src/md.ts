import MarkdownIt from "markdown-it";

const mdOptions = {};

export function md(options = {}) {
  const md = new MarkdownIt(options);
}
