import {factory} from './controller.js'
import $ from 'jquery'
let essayController = factory.willCreareOne("test1");
essayController.register("save",(_this,center)=>{
  $.ajax(
    "http://localhost:8080/blog/essay/save/",{
    data:{title:_this.state.title,author:_this.state.author,content:_this.state.content},
    type:'post',
    cache: false,
    crossDomain:true,
    success:function(data,texStatus,jqXHR){
      alert("创建文章成功！")
    },
    error:function(){
      alert("创建文章失败！")
    }
  })
})
