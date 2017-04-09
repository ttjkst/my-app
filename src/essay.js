import React from 'react';
import 'react-summernote/dist/react-summernote.css'; // import styles
import $ from "jquery";
import "./lib-source/js/bootstrap.min.js"
import 'react-summernote/dist/react-summernote.js';
import './lib-source/js/react-summernote/lang/summernote-zh-CN.js';
import './lib-source/css/mine/mycss.css';
import {center} from './controller.js';
import './essayAction.js'
import {ModalHeader,ModalBody,ModalWithCloseButton} from './modal.js';
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
let findFatherComponentName =function(name){
  return name.substr(0,name.lastIindexOf("."))
}
class SummernoteBasic extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    setTimeout(()=>$("#rootSummernoteBasic").summernote(this.props.options),10);
  }
  render(){
    return <div id="rootSummernoteBasic" ref="root">{this.props.value}</div>
  }
}
class ControlTags extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    center.register(this.pros.componentName,this)
  }
  componentWillUnmount(){
    center.cancel(this.props.componentName)
  }
  addTages(name){
    if(this.props.tags.find((x)=>x===name)==undefined){
      console.info(findFatherComponentName(this.props.componentName));
    }
  }
  render(){
    let key  = 1;
    let tags = this.props.tags.map(function(e){
      return <span key={key++} className="label label-default">{e}</span>
    }.bind(key))

    return <div className="pull-right">
        <h4>{tags}</h4>
      <span className="glyphicon glyphicon-tags pull-right" aria-hidden="true" ></span>
      <input id="tags" className="iput-buttom-line" type="text" name="tags" value="" />
      <button className="btn btn-info" onClick={(e)=>this.addTages(e.target.value)}>添加一个tags</button>
    </div>
  }
}
class AddTagesModal extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <ModalWithCloseButton componentName={this.props.componentName} isShow={this.props.isShow}>
  					<ModalHeader>添加tags</ModalHeader>
  					<ModalBody>
              <ControlTags tags={this.props.tags} componentName={this.props.componentName+".controlTags"}></ControlTags>
  					</ModalBody>
  			</ModalWithCloseButton>
    )
  }
}
class Tags extends React.Component{
  constructor(props){
    super(props)
  }
  addTages(value){

  }
  render(){
    let key  = 1;
    let tags = this.props.tags.map(function(e){
      return <span key={key++} className="label label-default">{e}</span>
    }.bind(key))
    return (
      <div className="pull-right">
          <h4>{tags}</h4>
        <span className="glyphicon glyphicon-tags pull-right" aria-hidden="true" onClick={center.dispatch(this.props._componentName,"show")} ></span>
      </div>
    )
  }
}
class CreateEssayUI extends React.Component{
  constructor(props){
    super(props)
    this.state={
      title:"",
      author:"",
      content:"",
      tags:[],
      isShow:false,
    }
  }
  onChange(){

  }
  handleTitleChange(){

  }
  componentDidMount(){
      center.registerThenCreateActions(this.props.componentName,this,{
          _innerAddTags:function(_this,center,rest){
            let orgTags = _this.state.tags;
            let newTags = orgTags.add(rest);
            _this.setState({tags:newTags});
          },
          _showModal:function(_this,center,rest){
            _this.setState({isShow:true});
          }
      });
  }
  componentWillUnmount(){
    center.cancel(this.props.componentName);
  }
  render(){
    return (
      <div>
        <AddTagesModal isShow={this.props.isShow} tags={this.state.tags} componentName={this.props.componentName+".addTagesModal"}></AddTagesModal>
        <form>
          <h3 className="">
            <label htmlFor="title">标题:</label>
            <input id="title" className="iput-buttom-line" type="text" onChange={(e)=>this.setState({title:e.target.value})} name="title" value={this.state.title}/>
          </h3>
          <div className="form-group">
            <label htmlFor="author">作者:</label>
            <input id="author" className="iput-buttom-line" type="text" name="author" onChange={(e)=>this.setState({author:e.target.value})} value={this.state.author}/>
          </div>
        </form>
   <SummernoteBasic
       value="Default value"
       options={{
         lang: 'zh-CN',
         height: 350,
         dialogsInBody: true,
         toolbar: [
           ['style', ['style']],
           ['font', ['bold', 'underline', 'clear']],
           ['fontname', ['fontname']],
           ['para', ['ul', 'ol', 'paragraph']],
           ['table', ['table']],
           ['insert', ['link', 'picture']],
           ['view', ['fullscreen', 'codeview']]
         ]
         ,
         callbacks:{
           onImageUpload:function(files){
             let data = new FormData();
             data.append("file",files[0]);
             var xhr = new XMLHttpRequest();
             xhr.open("post","http://localhost:1086/image/save/");
             xhr.send(data);
             xhr.onreadystatechange= function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                         let url = '';
                         url += 'http://localhost:1086/image/get?name='+xhr.responseText;
                           $(this).summernote('insertImage',url);
                }
             }
           }
         }//end with callbaks
       }}
       onChange={this.onChange}
     />
   <Tags tags={this.state.tags} _componentName={this.props.componentName} />
     </div>
   )
  }
}

class Root extends React.Component{
  render(){
    return (
      <div>
        <CreateEssayUI componentName={"test1"} />
        <button className="btn btn-info" onClick={()=>center.dispatch("test1","save")}>保存</button>
      </div>
    )
  }
}
export {Root};
