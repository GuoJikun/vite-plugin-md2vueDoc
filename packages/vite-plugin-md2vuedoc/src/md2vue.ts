import { md2html } from "./markdown-it/markdown-it";
import { pluginOption } from "./types";
import { config as markdownConfig } from "./markdown-it/config";
import { stringify } from "gray-matter";

export default function createMd2vueFn(option: pluginOption) {
  return (code: string, file: string) => {
    const { config: conf, plugins } = option.markdown || {};
    const mergeConfig = Object.assign(markdownConfig(file), conf || {});
    const { template } = md2html(code, mergeConfig, plugins || []);
    const Component = `
    <template>
      <div class="markdown-wrap">
        ${template}
      </div>
    </template>
    <script>
    import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue'
    const script = defineComponent({
      setup(props) {
        
      }
    });
    export default script;
    </script>
    `;
    return Component;
  };
}
