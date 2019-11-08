import { flatten, h } from './helper';

//function view(){}
export default function (state) {
    return (
        <div>
            HELLO VDOM
            <ul>
                {
                    // 生成元素为0到n-1的数组
                    [...Array(state.num).keys()]
                        .map( i => (
                            <li id={i} class={`li-${i}`}>
                                num{i}
                            </li>
                        ))
                }
            </ul>
        </div>
    );
}
