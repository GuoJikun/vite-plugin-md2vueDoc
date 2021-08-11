import path from "path";
import fs from "fs-extra";
import { MarkdownItConfig, DemoBlockType, VueDocPluginOptions } from "../types";
import matter from "gray-matter";
import hljs from "highlight.js";
import { hljsDefineVue } from "./../highlight/language-vue";
hljs.registerLanguage("vue", hljsDefineVue);

import { unquote } from "../utils";

export function generatorVueComponent() {}

export const config = (file: string): MarkdownItConfig => {
  const conf: MarkdownItConfig = {
    html: true,
    xhtmlOut: true,
    breaks: false,
    langPrefix: "language-",
    linkify: true,
    typographer: true,
    quotes: "\u201c\u201d\u2018\u2019",
    highlight: function (_code: string, lang: string, attrStr: string) {
      let code = _code;
      const attrs = attrStr.split(" ");
      const srcAttr = attrs.find((attr: string) => attr.startsWith("src="));
      console.log(attrs, "attrs", 123213123);
      const importSrc = srcAttr
        ? unquote((srcAttr.split("=")?.[1] || "").trim())
        : undefined;
      const isImport = !!importSrc;
      if (isImport) {
        const importPath = path.resolve(path.dirname(file), importSrc!);
        try {
          const importSource = fs.readFileSync(importPath, "utf-8");
          code = importSource;
        } catch (error) {
          console.error(`demo import fail:${error.message}`);
        }
      }

      const isVueDemo = lang === "vue" && attrs.includes("demo");

      if (isVueDemo) {
        generatorVueComponent();
      }
      // highlightDebug("highlight:", lang, "attrs:", attrs);

      const highlighted = hljs.highlight(lang, code, true);
      const { value = "" } = highlighted;

      return `<pre style="display:none;"></pre><pre class="hljs vuedoc__hljs language-${lang}"><code>${value}</code></pre>`;
    },
  };
  return conf;
};
