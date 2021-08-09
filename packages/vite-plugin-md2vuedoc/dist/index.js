"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myPlugin = void 0;
const fileRegex = /\.(md)$/;
function compileFileToJS(src) {
    console.log(src, "src");
    return src;
}
function myPlugin(opt) {
    return {
        name: "md2vuedoc",
        transform(src, id) {
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
exports.myPlugin = myPlugin;
//# sourceMappingURL=index.js.map