/*
  @babel/plugin-transform-react-jsx7

  ./node_modules/.bin/babel vdom.js
*/

//in
function render() {
    return (
        <div>
            Hello World
            <ul>
                <li id="1" class="li-1">
                    num1
                </li>
            </ul>
        </div>
    );
}


//out

// function renderend() {
//     return h(
//         'div',
//         null,
//         'Hello World',
//         h(
//             'ul',
//             null,
//             h(
//                 'li',
//                 { id: '1', 'class': 'li-1' },
//                 'num1'
//             )
//         )
//     );
// }
