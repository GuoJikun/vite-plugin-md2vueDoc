"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.createMarkdownRenderFn = exports.VUEDOC_RE = exports.VUEDOC_PREFIX = void 0;
var markdown_it_1 = require("./markdown-it");
var slash = require('slash');
var debug = require('debug')('vite:vuedoc:md');
exports.VUEDOC_PREFIX = 'vdpv_';
exports.VUEDOC_RE = /(.*?\.md)_(vdpv_\d+)/;
function createMarkdownRenderFn(options, config) {
    var wrapperClass = options.wrapperClass;
    // const { theme = 'default' } = prism
    return function (code, file) {
        var start = Date.now();
        var _a = markdown_it_1.remarkFile(code, __assign({ vuePrefix: exports.VUEDOC_PREFIX, file: file, isServe: config.command === 'serve' }, options)), template = _a.template, demoBlocks = _a.demoBlocks, matter = _a.matter, toc = _a.toc;
        var $vd = { matter: matter, toc: toc };
        // const fileName = path.basename(file)
        // const publicPath = path.relative(config.root, file)
        var docComponent = "\n    <template>\n      <div class=\"vuedoc " + (wrapperClass || '') + " " + (matter.wrapperClass || '') + "\">\n        " + template + "\n      </div>\n    </template>\n    <script>\n    import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue'\n    \n    " + demoBlocks
            .map(function (demo) {
            var request = slash(file) + "." + demo.id + ".vd";
            debug("import -> " + file);
            debug("import -> " + request);
            return "import " + demo.id + " from '" + request + "'";
        })
            .join('\n') + "\n    \n    // function injectCss(css, id) {\n    //   if (!document.head.querySelector('#' + id)) {\n    //     const node = document.createElement('style')\n    //     node.textContent = css \n    //     node.type = 'text/css'\n    //     node.id = id\n    //     document.head.appendChild(node)\n    //   }\n    // }\n    \n    const script = defineComponent({\n      components: {\n        " + demoBlocks.map(function (demo) { return demo.id; }).join(',') + "\n      },\n      setup(props) {\n        " + demoBlocks.map(function (demo) { return "const " + demo.id + "Ref = ref()"; }).join('\n') + "\n        const refs = [" + demoBlocks.map(function (demo) { return demo.id + "Ref"; }).join(',') + "]\n        const state = reactive({\n          " + demoBlocks.map(function (demo) { return demo.id + "Height: 0"; }).join(',') + "\n        })\n\n        const toggleCode = (index) => {\n          const id = '" + exports.VUEDOC_PREFIX + "' + index\n          if (state[id+'Height'] === 0) {\n            state[id+'Height'] = ((refs[index].value ? refs[index].value.offsetHeight : 0) || 0)\n          } else {\n            state[id+'Height'] = 0\n          }\n        }\n\n        return {\n          toggleCode,\n          ...toRefs(state),\n          " + demoBlocks.map(function (demo) { return demo.id + "Ref"; }).join(',') + "\n        }\n      }\n    });\n    script.$vd = " + JSON.stringify($vd) + "\n    export default script;\n    \n    </script>\n    ";
        debug("[render] " + file + " in " + (Date.now() - start) + "ms.");
        var result = { component: docComponent, demoBlocks: __spreadArray([], demoBlocks) };
        return result;
    };
}
exports.createMarkdownRenderFn = createMarkdownRenderFn;
