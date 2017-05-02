import React from 'react';
import {center,factory} from './controller.js';
import PageBar from './pageBar.js';
import './essayAction.js'
import QueueAnim from 'rc-queue-anim';
import {_updateFunction,_deploy,_delete} from './mangerAction.js'
import {CreateEssayUIWapper,EditEssayUI} from'./essay.js';
import $ from "jquery";
import {Nav} from "./navForManger.js";
import PropTypes from 'prop-types';
import {ModalHeader,ModalBody,ModalWithCloseButton} from './modal.js';

//basic class
class EditControlTags extends React.Component{
  constructor(props){
    super(props)
    this.state={
      inputTags:"",
      tags:[],
      hander:"",
      hander2:"",
    }
  }
  componentDidMount(){
    center.register("editControlTags",this)
  }
  componentWillUnmount(){
    center.cancel("editControlTags")
  }
  addTages(name){
    if(this.state.tags.find((x)=>x===name)==undefined){
      center.dispatch(this.state.hander,'_innerAddTags',name)
      this.state.tags.push(name);
      this.setState({
        tags:this.state.tags
      })
      center.dispatch(this.state.hander2,'changeTags',this.state.tags)
      this.setState({inputTags:""})
    }
  }
  render(){
    let key  = 1;
    console.info(this.state)
    let tags = this.state.tags.map((tag)=>{
      return <button key={key++} onClick={(e)=>{
          center.dispatch(this.state.hander,"_innerRemoveTags",tag,this.state.editEssayActionName)
          this.setState({
            tags:this.state.tags.filter((x)=>x!==tag)
          })
          center.dispatch(this.state.hander2,'changeTags',this.state.tags.filter((x)=>x!==tag))
        }} className="btn btn-default label label-default">{tag+" x"}</button>
    })

    return <div className="container">
        <h4>{tags}</h4>
      <span className="glyphicon glyphicon-tags" aria-hidden="true" ></span>
      <input id="tags" className="iput-buttom-line" type="text" onChange={(e)=>{
          this.setState({inputTags:e.target.value})
        }} name="tags" value={this.state.inputTags} />
      <button className="btn btn-info" onClick={(e)=>this.addTages(this.state.inputTags)}>添加一个tags</button>
    </div>
  }
}

class EditAddTagesModal extends React.Component{
  constructor(props){
    super(props)
    this.state={
      isShow:false
    }
  }
  componentDidMount(){
    center.register(this.props.componentName+"Wapper",this)
  }
  componentWillUnmount(){
    center.cancel(this.props.componentName+"Wapper")
  }
  render(){
    return (
      <ModalWithCloseButton  componentName={this.props.componentName} isShow={this.state.isShow}>
  					<ModalHeader>添加tags</ModalHeader>
  					<ModalBody>
              <EditControlTags></EditControlTags>
  					</ModalBody>
  			</ModalWithCloseButton>
    )
  }
}

let pageContextNum=1;
class  PageContext extends React.Component {
  constructor(props) {
      super(props);
      this.state={
          content:props.content,
          show:true,
          title:props.title,
          author:props.author,
          actionState:"basic",
          tags:[]
      }
      this.id = pageContextNum++;
      this.dispatcher = null;
      this.content = props.content;
  }
  componentDidMount(){
      this.dispatcher =  center.registerThenCreateActions("pageContext"+this.id,this,{
        deploy:_deploy,
        disappear:function(_this,center,rest){
                        let other = rest[0];
                        if(other===_this){
                          return;
                        }else{
                          _this.setState({
                            actionState:"disapper",
                          })
                        }
                  },
        basic:function(_this,center,rest){
          _this.setState({
            actionState:"basic",
            content:_this.content
          })
        },
        changeTags:(_this,cneter,rest)=>{
          let [newTags] = rest;
          console.info(newTags)
          _this.setState({
            tags:newTags
          })
        }
      })
      pageContextNum++;
  }
  componentDidUpdate(prevProps,prevState){
    switch (this.state.actionState) {
      case "disapper":

        break;
      case "basic":
          $(this.refs.footer).prev().removeClass("pageMinHight");
          if(prevState.actionState!==undefined&&prevState.actionState==="deploy"){
            $('html, body').animate({
                scrollTop: $(this.refs.footer).prev().prev().offset().top
            }, 1000);
          }
          break;
      case "deploy":
          $(this.refs.footer).prev().addClass("pageMinHight noView");
          $(this.refs.footer).prev().animate({
            width:"100%",
            opacity:"1"
          },'slow',function(){
            $(this.refs.footer).prev().removeClass("noView");
            $(this.refs.footer).prev().removeAttr("style");
          }.bind(this));
          break;
      default:

    }
  }
  componentWillUnmount(){
    center.cancel("pageContext"+this.id);
    factory.remove("pageContext"+this.id)
  }
  componentWillmount(){

  }
  render(){
    let main = this.state.actionState==="deploy"?(
      <div className="panel-body" >
      <EditEssayUI componentName={"edit"+this.id}
        _showModal={(_this,center)=>{
          center.dispatch("searchModalWapper","show")
          center.dispatch("editControlTags","edit",this.state.tags,"edit"+this.id,"pageContext"+this.id)
        }}
        _update={_updateFunction}
        _delete={_delete}
        title={this.state.title} id={this.props.id} author={this.state.author} tags={this.state.tags} content={this.state.content}>
      </EditEssayUI>
      </div>
    ):<div className="panel-body" dangerouslySetInnerHTML={{__html:this.state.content}} ></div>
    return (<div className="panel panel-info" style={this.state.actionState!=="disapper"?{}:{"display":"none"}} >
              <div className="panel-title"><h3>{this.props.title}</h3></div>
                  {main}
              <div className="panel-footer" ref ="footer">
                <button type="button" className="btn btn-info" onClick ={()=>{
                return    this.state.actionState==="deploy"?center.dispatchByFilter((x)=>{
                      return x.indexOf("pageContext")!==-1
                    },"basic")
                    :this.dispatcher("deploy");
                }
              }>{this.state.actionState==="deploy"?"收取":"展开"}</button>
            <button type="button" className="btn btn-warning" onClick={()=>center.dispatch("edit"+this.id,"_update")} style={this.state.actionState==="deploy"?{}:{"display":"none"}} >上传</button>
            <buttom type="button" className="btn btn-danger" onClick={()=>center.dispatch("edit"+this.id,"_delete")}>删除</buttom>
              </div>
            </div>)
  }
}
class PageContexts extends React.Component{
    constructor(props){
      super(props)
      this.state={
        manys:[],
        key:"",
        totalPage:0,
        currNo:0,
        size:0,
      }
    }
    changeKey(e){
      this.setState({
        key:e.target.value
      })
    }
    componentDidMount(){
      center.register("manger-pageContexts",this);
    }
    componentWillUnmount(){
      center.cancel("manger-pageContexts")
    }
      render(){
        let pageContexts =this.state.manys.map((e)=>{
          return    <PageContext key={e.id} key={e.id} id={e.id} title={e.title} author={e.author} content={e.content}  />
        })
        return <div className='container' style={{backgroundColor:"#e7e7e7"}}>
        <QueueAnim delay={300} className="queue-simple">
        {pageContexts}
        </QueueAnim>
        <PageBar beTelled={"manger-pageContexts"} totalPage={this.state.totalPage} currNo={this.state.currNo} size={this.state.size}></PageBar>
        </div>
      }
}
class Root extends React.Component{
  constructor(props){
    super(props)
    this.state={
        actionState:"search"
    }
  }
  componentDidMount(){
    center.register("root",this)
  }
  componentWillUnmount(){
    center.cancel("root")
  }
  render(){
    let main = this.state.actionState==="search"?(<PageContexts></PageContexts>):<CreateEssayUIWapper componentName="test1"></CreateEssayUIWapper>
    return <div style={{backgroundColor:"#e7e7e7"}}>
            <EditAddTagesModal componentName="searchModal" ></EditAddTagesModal>
            <Nav tell={"root"} createAction={"create"} searchAction={"search"} actionState={this.state.actionState}></Nav>
            {main}
          </div>
  }
}

export default Root;
