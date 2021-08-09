const fileRegex = /\.(md)$/;

function compileFileToJS(src: any) {
  console.log(src, "src");
  return src;
}

export function myPlugin(opt: any) {
  return {
    name: "md2vuedoc",
    transform(src: any, id: any) {
      console.log(opt, "opt");
      if (fileRegex.test(id)) {
        return {
          code: compileFileToJS(src),
          map: null, // 如果可行将提供 source map
        };
      }
    },
  };
}
