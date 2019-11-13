import { flatten, h } from './helper';
import MyComp from './myComponent';

const arr = [0, 1, 2, 3, 4];
//function view(){}
export default function(state) {
    const elm = arr.pop();

    // 用于测试能不能正常删除元素
    if (state.num !== 9) arr.unshift(elm);

    // 用于测试能不能正常添加元素
    if (state.num === 12) arr.push(9);

    return (
        <div>
            Hello World
            <MyComp count={state.num} />
            <ul>
                {
                    arr.map( i => (
                        <li id={i} key={i}>
                            num{i}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
