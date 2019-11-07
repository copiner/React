export function view() {
    return (
        <div>
            Hello World
            <ul>
                {
                    // 生成元素为0到n-1的数组
                    [...Array(state.num).keys()]
                        .map( i => (
                            <li id={i} class={`li-${i}`}>
                                num{i * state.num}
                            </li>
                        ))
                }
            </ul>
        </div>
    );
}
