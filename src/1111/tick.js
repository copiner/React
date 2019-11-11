import diff from './diff';
import view from './view';

let dom;

export function tick(element,state,timer) {
  console.log(state.num)
    if (state.num > 10) {
        clearTimeout(timer);
        return;
    }

    const newVDom = view(state);
    //新建 删除 替换 更新 dom newVDom
    diff(dom, newVDom, element);

}
