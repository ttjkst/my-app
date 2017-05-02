import {factory} from './controller.js'
import $ from 'jquery'
let pageContextsController = factory.createOne("all-pageContexts");
pageContextsController.register("init",(_this,center)=>{
  let date = {pageNo:1,pageSize:6,searchKey:_this.state.key};
  $.ajax(
    "http://localhost:8080/blog/essay/search/",{
    data:date,
    type:'get',
    cache: false,
    crossDomain:true,
    success:function(data,texStatus,jqXHR){
      _this.setState({
        totalPage:data.totalPages,
        currNo:1,
        size:6,
        manys:data.content
      })
    },
    error:function(){
      alert("查询失败！")
    }
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
let loadEssay = function(_this,center,...rest){
          $.ajax(
            "http://localhost:8080/blog/essay/load/"+_this.props.id,{
            type:'get',
            cache: false,
            crossDomain:true,
            success:function(data,texStatus,jqXHR){
              _this.setState({
                  content:data.content,
                  actionState:"deploy",
              })
              center.dispatchByFilter((x)=>{return x.indexOf("pageContext")!==-1},"disappear",_this)
            },
            error:function(){
              alert("加载失败！")
            }
          })
          }
export {loadEssay};
