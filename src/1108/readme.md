
1106是通过在diff过程中生成patch对象，然后在利用这个对象更新dom,实际上这步是多余的。
既然在diff的时候就已经知道要如何操作dom了，可以直接在diff里面更新