import React from 'react';
import {center,factory} from './controller.js';
import QueueAnim from 'rc-queue-anim';
import $ from 'jquery'
import './lib-source/css/mine/mycss.css'
import './pageWebAction.js'
let pageContextNum = 0;
function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
class  PageContext extends React.Component {
  constructor(props) {
      super(props);
      this.state={
          content:"Basic panel example",
          show:true,
          actionState:"basic"
      }
      this.id = pageContextNum++;
      this.dispatcher = null;
      this.content = "Basic panel example";
  }
  componentDidMount(){
      this.dispatcher =  center.registerThenCreateActions("pageContext"+this.id,this,{
        deploy:function(_this,center,...rest){
                    _this.setState({
                      content:"股生用他往要北官语？好不年党一去主印必海告眼案没个，"
                      +"了不大名子天明！子中亲树物，上一不总和生：不我一管的大我活料孩动中今我程童自男道更信四金明你更间说孩。是母人工持离以雄时！"
                      +"令看哥花车件主境湾它：际被性了来要等……一心法化视象素到体中同子电同展画树，投合料自解有示它去任失治一乐独子气国、自独野发部电……"
                      +"要中花望全现绿、绿情云。答严然水十，功内所走价曾精还，业影友无研华见会以，形战身们加我学以……所电园孩毛何却给白离病，小尽日奇，结"
                      +"感式是居会育儿师系夜有，实令供然正等我间，关虽有不内研什条在有：一我直！生去爱善，意保数分事把在家斯赛大想西光学充……线他亲爸为灵队？"
                      +"总是那学如；传从汽我戏然场其负：'人是由人合也环支施。服党路传球什光走人洲可光老有题，麽门持在先种红要艺海出门务望从？走知消家以乐色"
                      +"终时密有特的只远易夜变活成机是孩比气。才工力情。本格点师而背一过受！"+
                      "股生用他往要北官语？好不年党一去主印必海告眼案没个，"
                      +"了不大名子天明！子中亲树物，上一不总和生：不我一管的大我活料孩动中今我程童自男道更信四金明你更间说孩。是母人工持离以雄时！"
                      +"令看哥花车件主境湾它：际被性了来要等……一心法化视象素到体中同子电同展画树，投合料自解有示它去任失治一乐独子气国、自独野发部电……"
                      +"要中花望全现绿、绿情云。答严然水十，功内所走价曾精还，业影友无研华见会以，形战身们加我学以……所电园孩毛何却给白离病，小尽日奇，结"
                      +"感式是居会育儿师系夜有，实令供然正等我间，关虽有不内研什条在有：一我直！生去爱善，意保数分事把在家斯赛大想西光学充……线他亲爸为灵队？"
                      +"总是那学如；传从汽我戏然场其负：'人是由人合也环支施。服党路传球什光走人洲可光老有题，麽门持在先种红要艺海出门务望从？走知消家以乐色"
                      +"终时密有特的只远易夜变活成机是孩比气。才工力情。本格点师而背一过受！",
                      actionState:"deploy",
                    })
                    center.dispatchByFilter((x)=>{return x.indexOf("pageContext")!==-1},"disappear",_this)
                  },
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
              <div className="panel-title"><h3>this is title !</h3></div>
              <div className="panel-body" >
                  {this.state.content}
              </div>
              <div className="panel-footer" ref ="footer">
                <button type="button" className="btn btn-info" onClick ={()=>{
                return    this.state.actionState==="deploy"?center.dispatchByFilter((x)=>{
                      return x.indexOf("pageContext")!==-1
                    },"basic")
                    :this.dispatcher("deploy");
                }
              }>{this.state.actionState==="deploy"?"收取":"展开"}</button>
              </div>
            </div>)
  }
}
class PageBarChildren extends React.Component{
    constructor(props){
      super(props)
    }
    getCssByActionState(){
      if(this.props.actionState==="clicked"){
        return "active";
      }
      else if(this.props.actionState==="disable")
      {
        return "disabled"
      }
      return "";
    }
    handleClick(e){
      console.info(this.props)
      if(this.props.actionState!=="disable"&&this.props.actionState!=="clicked"){
          center.dispatch("all-pageContexts","clickNo",e.target.firstChild.textContent)
      }
    }
    render(){
      const {children} = this.props;
      return  <li  className={this.getCssByActionState()}><a href="#" onClick={this.handleClick.bind(this)}  >{children}</a></li>
    }
}
let  createPagetagList = function(totalPage,currNo,size){
					let key = size/2+1;
					let e=null;
          let list = [];
					let beginNo = currNo-key<=0?1:currNo-key;
					let endNo = totalPage-currNo<=size-1?totalPage:beginNo+size-1;
					if(beginNo>1){
						e={"key":totalPage+1,"actionState":"disable","value":"..."};
						list.push(e);
					}

					for(var i=beginNo;i<=endNo;i++){
						e={"key":i,"actionState":i===currNo?"clicked":"","value":i};
						list.push(e);
					}

					if(totalPage>endNo){
						e={"key":totalPage+2,"actionState":"disable","value":"..."};
						list.push(e);
            e={"key":totalPage,"actionState":"","value":totalPage};
						list.push(e);
					}
					return list;
}
let checkPageBarData = function(totalPage,currNo,size) {
  if(totalPage<=0){
    return false;
  }
  if(currNo>totalPage||currNo<=0){
    return false;
  }
  if(size<=0){
    return false;
  }
  return true;
}
class PageBar extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    let pageNoList = [];
    if(checkPageBarData(this.props.totalPage,this.props.currNo,this.props.size)){
    pageNoList =  createPagetagList(this.props.totalPage,this.props.currNo,this.props.size).map(function(e){
        return <PageBarChildren key={e.key} actionState={e.actionState}>{e.value}</PageBarChildren>
      })
    }

  return (
					<div className="text-center">
								<nav>
								  <ul className="pagination">
								    <li id="parentPrevious">
								      <a href="#" aria-label="Previous" onClick={()=>center.dispatch("all-pageContexts","prev")} className={0===this.props.currNo?"disappear":""}>
								        <span aria-hidden="true">«</span>
								      </a>
								    </li>
								   		{pageNoList}
								    <li id="parentNext">
								      <a href="#" aria-label="Next"     onClick={()=>center.dispatch("all-pageContexts","next")}  className={this.props.totalPage===this.props.currNo?"disappear":""}>
								        <span aria-hidden="true">»</span>
								      </a>
								    </li>
								  </ul>
							</nav>
						</div>
						)
  }
}


class PageContexts extends React.Component{
    constructor(props){
      super(props)
      this.state={
        manys:[1,2,3,4,5],
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
        let pageContexts =this.state.manys.map((key)=>{
          return    <PageContext key={key} />
        })
        return <div className='container' style={{backgroundColor:"#e7e7e7"}}>
        <div className="input-group" style={{marginTop:"10px",marginBottom:"10px"}} >
          <input type="text" placeholder="输入你感兴趣的关键字" className="form-control" onChange={this.changeKey} value={this.state.key} name="key"/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button">Search!</button>
          </span>
        </div>
        <QueueAnim delay={300} className="queue-simple">
        {pageContexts}
        </QueueAnim>
        <PageBar totalPage={this.state.totalPage} currNo={this.state.currNo} size={this.state.size}></PageBar>
        </div>
      }
}

export default PageContexts;
