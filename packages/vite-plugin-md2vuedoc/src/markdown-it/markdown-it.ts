import path from "path";
import fs from "fs-extra";
import MarkdownIt from "markdown-it";
import matter from "gray-matter";
import hljs from "highlight.js";
import { hljsDefineVue } from "./../highlight/language-vue";

import { DemoBlockType, VueDocPluginOptions, MarkdownItConfig } from "../types";
import { unquote } from "../utils";

hljs.registerLanguage("vue", hljsDefineVue);

export const remarkFile = (
  source: string,
  options: {
    vuePrefix: string;
    file: string;
    isServe: boolean;
  } & VueDocPluginOptions
): {
  template: string;
  matter: Record<string, any>;
  toc: Array<{ content: string; anchor: string; level: number }>;
  demoBlocks: DemoBlockType[];
} => {
  const {
    vuePrefix,
    file,
    previewClass,
    previewComponent,
    markdownIt,
    highlight,
  } = options;
  const { plugins } = markdownIt;
  const { theme } = highlight;
  const demoBlocks: DemoBlockType[] = [];
  let toc: Array<{ content: string; anchor: string; level: number }> = [];
  const md = new MarkdownIt({
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
      const isVueDemo = lang === "vue" && attrs.includes("demo");
      const srcAttr = attrs.find((attr: string) => attr.startsWith("src="));
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

      // highlightDebug("highlight:", lang, "attrs:", attrs);

      const highlighted = hljs.highlight(lang, code, true);
      const { value = "" } = highlighted;
      if (isVueDemo) {
        const componentCode = isImport
          ? `<template>
              <ImportDemo />
            </template>
            <script>
              import ImportDemo from '${importSrc}'
              export default {
                components:{
                  ImportDemo
                }
              }
            </script>
            `
          : code;
        // const id = `${vuePrefix}${demoBlocks.length}_${revisionHash(componentCode)}`
        const id = `${vuePrefix}${demoBlocks.length}`;
        demoBlocks.push({
          id,
          code: `${componentCode}`,
        });
        if (previewComponent) {
          return `<pre style="display:none;"></pre><div class="vuedoc-demo ${previewClass}">
                    <${previewComponent} lang="${lang}" theme="${theme}">
                      <template #code><pre class="hljs language-${lang} hljs--${theme}" v-pre><code>${value}</code></pre></template>
                      <${id} />
                    </${previewComponent}>
                </div>`;
        } else {
          return `<pre style="display:none;"></pre><div class="vuedoc-demo ${previewClass}">
                  <div class="vuedoc-demo__inner">
                    <div class="vuedoc-demo__preview">
                      <${id} />
                    </div>
                    <div :style="{ height: ${id}Height + 'px' }" class="vuedoc-demo__source">
                      <div ref="${id}Ref" class="vuedoc-demo__sourceref">
                      <div class="vuedoc__code ${previewClass}"><pre class="hljs vuedoc__hljs language-${lang} hljs--${theme}" v-pre><code>${value}</code></pre></div>
                      </div>
                    </div>
                    <div class="vuedoc-demo__footer" @click="toggleCode(${
                      demoBlocks.length - 1
                    })">
                      {{ ${id}Height > 0 ? 'hidden' : 'show' }}
                    </div>
                  </div>
                </div>`;
        }
      }
      return `<pre style="display:none;"></pre><pre class="hljs vuedoc__hljs language-${lang} hljs--${theme}"><code>${value}</code></pre>`;
    },
  });

  plugins.forEach((plugin: any) => {
    md.use(plugin);
  });
  // containers.forEach(name => {
  //   md.use(MarkdownItContainer, name)
  // })
  const { content, data: frontmatter } = matter(source);
  const template = md.render(content);
  // debug(`mdrender -> ${file}`);
  return { template, demoBlocks, matter: frontmatter || {}, toc };
};

export function md2html(
  source: string,
  config: MarkdownItConfig,
  plugins: Array<any>
) {
  const md = new MarkdownIt({
    ...(config as any),
  });

  if (plugins && plugins.length) {
    plugins.forEach((plugin: any) => {
      md.use(plugin);
    });
  }
  const { content, data: header } = matter(source);
  const htmlStr = md.render(content);
  return { template: htmlStr, header };
}
