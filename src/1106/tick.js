import diff from './diff';
import patch from './patch';

export function tick(element) {
    if (state.num > 20) {
        clearTimeout(timer);
        return;
    }

    const newVDom = view();

    // 生成差异对象
    const patchObj = diff(preVDom, newVDom);

    preVDom = newVDom;
    // 遍历差异对象并更新 DOM
    // 给 DOM 打个补丁
    patch(element, patchObj);
}
