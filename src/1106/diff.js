//最外层的 type 对应的是 DOM 元素的变化类型，有 4 种：新建、删除、替换和更新。
//props 变化的 type 只有2种：更新和删除
const nodePatchTypes = {
    CREATE: 'create node',
    REMOVE: 'remove node',
    REPLACE: 'replace node',
    UPDATE: 'update node'
}

const propPatchTypes = {
    REMOVE: 'remove prop',
    UPDATE: 'update prop'
}

// 比较 props 的变化
let diffProps = (oldVDom, newVDom) => {
    const patches = [];

    const allProps = {...oldVDom.props, ...newVDom.props};

    // 获取新旧所有属性名后，再逐一判断新旧属性值
    Object.keys(allProps).forEach((key) => {
            const oldValue = oldVDom.props[key];
            const newValue = newVDom.props[key];

            // 删除属性
            if (newValue == undefined) {
                patches.push({
                    type: propPatchTypes.REMOVE,
                    key
                });
            }
            // 更新属性
            else if (oldValue == undefined || oldValue !== newValue) {
                patches.push({
                    type: propPatchTypes.UPDATE,
                    key,
                    value: newValue
                });
            }
        }
    )

    return patches;
}

// 比较 children 的变化
let diffChildren = (oldVDom, newVDom) => {
    const patches = [];

    // 获取子元素最大长度
    const childLength = Math.max(oldVDom.children.length, newVDom.children.length);

    // 遍历并diff子元素
    for (let i = 0; i < childLength; i++) {
        patches.push(diff(oldVDom.children[i], newVDom.children[i]));
    }

    return patches;
}

function diff(oldVDom, newVDom) {
    // 新建 node
    if (oldVDom == undefined) {
        return {
            type: nodePatchTypes.CREATE,
            vdom: newVDom
        }
    }

    // 删除 node
    if (newVDom == undefined) {
        return {
            type: nodePatchTypes.REMOVE
        }
    }

    // 替换 node
    if (
        typeof oldVDom !== typeof newVDom ||
        ((typeof oldVDom === 'string' || typeof oldVDom === 'number') && oldVDom !== newVDom) ||
        oldVDom.tag !== newVDom.tag
    ) {
       return {
           type: nodePatchTypes.REPLACE,
           vdom: newVDom
       }
    }

    // 更新 node
    if (oldVDom.tag) {
        // 比较 props 的变化
        const propsDiff = diffProps(oldVDom, newVDom);

        // 比较 children 的变化
        const childrenDiff = diffChildren(oldVDom, newVDom);

        // 如果 props 或者 children 有变化，才需要更新
        if (propsDiff.length > 0 || childrenDiff.some( patchObj => (patchObj !== undefined) )) {
            return {
                type: nodePatchTypes.UPDATE,
                props: propsDiff,
                children: childrenDiff
            }
        }

    }
}

export {diff as default};

//差异对象的数据结构是下面这个样子，与每一个 VDOM 元素一一对应
/*
{
    type,
    vdom,
    props: [{
               type,
               key,
               value
            }]
    children
}
*/
