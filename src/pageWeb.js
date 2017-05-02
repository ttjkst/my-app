import React from 'react';
import {center,factory} from './controller.js';
import QueueAnim from 'rc-queue-anim';
import $ from 'jquery'
import './lib-source/css/mine/mycss.css'
import {loadEssay} from './pageWebAction.js'
import PageBar from "./pageBar.js"
let pageContextNum = 0;
function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
class  PageContext extends React.Component {
  constructor(props) {
      super(props);
      this.state={
          content:props.content,
          show:true,
          title:props.title,
          author:props.author,
          actionState:"basic"
      }
      this.id = pageContextNum++;
      this.dispatcher = null;
      this.content = this.props.content==undefined?"文章丢失了":this.props.content;
  }
  componentDidMount(){
      this.dispatcher =  center.registerThenCreateActions("pageContext"+this.id,this,{
        deploy:loadEssay,
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
    return (<div className="panel panel-info" style={this.state.actionState!=="disapper"?{}:{"display":"none"}} >
              <div className="panel-title"><h3>{this.props.title}<small>by {this.props.author}</small></h3></div>
              <div className="panel-body" dangerouslySetInnerHTML={{__html:this.state.content}} >
              </div>
              <div className="panel-footer" ref ="footer">
                <button type="button" className="btn btn-info" onClick ={()=>{
                return    this.state.actionState==="deploy"?center.dispatchByFilter((x)=>{
                      return x.indexOf("pageContext")!==-1
                    },"basic")
                    :this.dispatcher("deploy",this.props.id);
                }
              }>{this.state.actionState==="deploy"?"收取":"展开"}</button>
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
      center.register("all-pageContexts",this);
    }
    componentWillUnmount(){
      center.cancel("all-pageContexts")
    }
      render(){
        let pageContexts =this.state.manys.map((e)=>{
          return    <PageContext key={e.id} id={e.id} title={e.title} author={e.author} content={e.content}  />
        })
        return <div className='container' style={{backgroundColor:"#e7e7e7"}}>
        <div className="input-group" style={{marginTop:"10px",marginBottom:"10px"}} >
          <input type="text" placeholder="输入你感兴趣的关键字" className="form-control" onChange={(e)=>this.setState({
            key:e.target.value
          })
        } value={this.state.key} name="key"/>
          <span className="input-group-btn">
            <button className="btn btn-default" onClick={()=>center.dispatch("all-pageContexts","init")} type="button">Search!</button>
          </span>
        </div>
        <QueueAnim delay={300} className="queue-simple">
        {pageContexts}
        </QueueAnim>
        <PageBar beTelled={"all-pageContexts"} totalPage={this.state.totalPage} currNo={this.state.currNo} size={this.state.size}></PageBar>
        </div>
      }
}

export default PageContexts;
