import diff from './diff';
import {patch} from './patch';
import view from './view';

let preVDom;

export function tick(element,state,timer) {
  console.log(state.num)
    if (state.num > 10) {
        clearTimeout(timer);
        return;
    }

    const newVDom = view(state);

    // 生成差异对象
    const patchObj = diff(preVDom, newVDom);
    console.log(patchObj);
    preVDom = newVDom;
    // 遍历差异对象并更新 DOM
    // 给 DOM 打个补丁
    patch(element, patchObj);
}
