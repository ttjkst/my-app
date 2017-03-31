import {factory} from './controller.js'

let pageContextsController = factory.createOne("all-pageContexts");
pageContextsController.register("init",(_this,center)=>{
  _this.setState({
    totalPage:100,
    currNo:1,
    size:6
  })
})
pageContextsController.register("next",(_this,center)=>{
  let currNo = _this.state.currNo
  if(currNo<_this.state.totalPage){
    currNo++;
  }
  _this.setState({
    currNo:currNo,
  })
})
pageContextsController.register("prev",(_this,center)=>{
  let currNo = _this.state.currNo
  if(currNo>1){
    currNo--;
  }
  _this.setState({
    currNo:currNo,
  })
})
pageContextsController.register("clickNo",(_this,center,rest)=>{
    let pageNo = rest[0]
    _this.setState({
      currNo:Number(pageNo),
    })
})
