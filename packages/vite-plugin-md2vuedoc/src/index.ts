import { ResolvedConfig, normalizePath } from "vite";
import createMd2vueFn from "./md2vue";
import path from "path";

const fileRegex = /\.md$/;

let config: ResolvedConfig;
let vuePlugin: any | undefined;

export function myPlugin(opt: any = {}) {
  return {
    name: "md2vuedoc",
    configResolved(resolvedConfig: ResolvedConfig) {
      // store the resolved config
      config = resolvedConfig;
      vuePlugin = config.plugins.find((p) => p.name === "vite:vue");
    },
    transform(src: any, id: any) {
      if (fileRegex.test(id)) {
        // console.log(src, "src", id, "id");
        const filePath = id.startsWith(config.root + "/")
          ? id
          : normalizePath(id);

        console.log(
          id.startsWith(config.root + "/"),
          config.root,
          id,
          normalizePath(id)
        );
        const md2vue = createMd2vueFn(opt);
        const codes = md2vue(src, filePath);
        // console.log(codes, 1);
        return {
          code: codes,
          map: null, // 如果可行将提供 source map
        };
      }
    },
  };
}
