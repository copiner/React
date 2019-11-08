import diff from './diff';
import view from './view';

//let preVDom;

export function tick(element,state,timer) {
  console.log(state.num)
    if (state.num > 10) {
        clearTimeout(timer);
        return;
    }

    const newVDom = view(state);

    //比较更新节点
    diff(newVDom, element);

    // diff(preVDom, newVDom, element);

    // preVDom = newVDom;

}
