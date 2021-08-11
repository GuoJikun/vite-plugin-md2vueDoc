# test

dfsdafsadf

```ts
import md2vue from "./md2vue";

const fileRegex = /\.md$/;

export function myPlugin(opt: any = {}) {
  return {
    name: "md2vuedoc",
    transform(src: any, id: any) {
      if (fileRegex.test(id)) {
        console.log(id, "id");
        const codes = md2vue(src, opt);
        // console.log(codes, 1);
        return {
          code: codes,
          map: null, // 如果可行将提供 source map
        };
      }
    },
  };
}
```

[baidu](https://wwww.baidu.com)

```vue demo
<template>
  <h1>这是标题</h1>
  <p>这是文章内容</p>
</template>
```
