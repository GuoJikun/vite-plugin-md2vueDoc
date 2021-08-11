export function md2vue() {}

export function unquote(str: string) {
  if (!str) {
    return "";
  }
  const reg = /[\'\"]/;
  let ret = str;
  if (reg.test(ret.charAt(0))) {
    ret = ret.substr(1);
  }
  if (reg.test(ret.charAt(ret.length - 1))) {
    ret = ret.substr(0, ret.length - 1);
  }
  return ret;
}
