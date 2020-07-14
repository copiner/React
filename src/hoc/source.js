// "DataSource" 是个全局范围内的数据源变量
let DataSource = {
  channel:"suu",
  data:[{
    title:'wda',
    content:'yuutylop vetu, kow',
    status:0
  },{
    title:'wrq',
    content:'yuutylop vetu, kow',
    status:0
  }],
  combined(props){
    
    if(Object.prototype.toString.call(props) === '[object Object]'){
      this.data.push(props)
    }

    return this.data

  },

  addChange(fun){

    if(typeof fun !== 'function'){
      return
    }

    DataSource.data.forEach(element => {
      element.status = 1;
    });

  },

  removeChange(fun){

    if(typeof fun !== 'function'){
      return
    }
    DataSource.data.forEach(element => {
      element.status = 0;
    });

  }

}

export default DataSource;
