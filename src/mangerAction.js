import {factory} from './controller.js'
import $ from 'jquery'

let pageContextsController = factory.createOne("manger-pageContexts");
pageContextsController.register("init",(_this,center)=>{
  let date = {pageNo:1,pageSize:6,searchKey:_this.state.key};
  $.ajax(
    "http://localhost:8080/blog/essay/search/",
    {
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
let rootController = factory.createOne("root");
rootController.register("search",(_this,center,rest)=>{
  console.info(_this)
  let searchValue = rest[0];
  _this.setState({
    actionState:"search"
  })
})
rootController.register("create",(_this)=>{
  _this.setState({
    actionState:"create"
  })
})
let modalController = factory.createOne("searchModalWapper")
modalController.register("show",(_this)=>{
  console.info(_this)
  _this.setState({
    isShow:true
  })
})
let editControlTagsController = factory.createOne("editControlTags");
editControlTagsController.register("edit",(_this,center,rest)=>{
let [tags,hander,hander2]=rest;
  _this.setState({
    tags:tags,
    hander:hander,
    hander2:hander2
  })
})
let _updateFunction = (_this,center,rest)=>{
  console.info(_this.state)
  let {author,title,tags,content} = _this.state;
  let {id} =_this.props;
  let realtags = "";
  tags.forEach((x)=>{
    realtags+="tags,"
  })
  let args = {
    id:id,
    tags:realtags,
    title:title,
    content:content,
    author:author
  }
  $.ajax(
    "http://localhost:8080/blog/essay/update/",{
    type:'get',
    cache: false,
    data:args,
    crossDomain:true,
    success:function(data,texStatus,jqXHR){
      alert("更改成功!")
    },
    error:function(){
      alert("加载失败！")
    }
  })
}
let _delete = function(_this,center,...rest){
  $.ajax(
    "http://localhost:8080/blog/essay/delete/"+_this.props.id,{
    type:'get',
    cache: false,
    crossDomain:true,
    success:function(data,texStatus,jqXHR){
      window.location.reload()
    },
    error:function(){
      alert("删除失败")
    }
  })


}
let _deploy = function(_this,center,...rest){
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
export {_updateFunction,_deploy,_delete};
