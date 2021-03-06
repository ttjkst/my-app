import React from 'react';
//import '../common/foo.js';
import {ModalHeader,ModalBody,ModalWithCloseButton} from './modal.js';
import {center} from './controller.js';
import './foo.js';
import $ from "jquery";
import './homeAction.js';
import {NavBarHeader,NavBar} from './head.js';
import {BasicAnimationBox} from './animations.js'
import ReactTransitionGroup from 'react-addons-transition-group'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PageWeb from './pageWeb.js';
import './lib-source/css/mine/mycss.css'
import './transition.css'
class HeaderTabs extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tabDatas:[
            {key:1,	text:"首页",			css:""},{key:2,	text:"关于本站与我",	css:""},
            {key:3,	text:"编程之外",		css:""}
			]}
	}
	componentDidMount(){
		center.register("HeaderTabs",this);
	}
	componentWillUnmount(){
		center.cancel("HeaderTabs");
	}
	handleClick(e){
		center.dispatch("HeaderTabs","handleClick",e);
	}
	render(){
		const tabs = this.state.tabDatas.map(({key,css,text})=>{
			return <li key={key} role="presentation"  className={css}><a  key={key} onClick={this.handleClick} href="Javascript:void(0)">{text}</a></li>
		})
		return(
						<ul className="nav navbar-nav" id="root" >
							{tabs}
						</ul>
					)
	}
}
class Root extends React.Component{
	render(){
		return <NavBar>
					<NavBarHeader>
						<HeaderTabs/>
					</NavBarHeader>
			   </NavBar>
	}
}
//main
class  FirstWeb extends React.Component{
	componentDidMount(){
	}
		render(){
					return (
					<div ref='root' className="jumbotron base_background">
						<div className="container">
							<h1>我</h1>
							<p>有一个梦想</p>
							<p>希望生活的喧嚣消失</p>
							<p>自己不会茫然</p>
						</div>
					</div>
				)
		}
	}
class SceondWeb extends React.Component{

	render(){
		return 	(
				<div className="base_background">
					<div className="container">
						<div className="thumbnail" style={{marginTop:"1%"}}>
							<div className="caption" style={{marginBottom:"10%"}}>
								<h1 className="text-center">关于本站与我</h1>
								<div className="text-center">
									<span className="glyphicon glyphicon-user">:ttjkst&nbsp;</span>
									<span className="glyphicon glyphicon-time">:1991-11-22</span>
								</div>
								<p className="p1"><big>我是一名大学生，这是我的第一个网站。</big></p>
								<p className="p1"><big>其实我也不知道说些什么。</big></p>
								<p className="p1"><big>还是说说我最喜欢的栏目吧---"关于IT",这里我会放一些我自己学习记录。</big></p>
								<p className="p1"><big>好了就这些。。以下是联系方式：</big></p>
								<p className="p1"><big>我的邮箱：791599901@qq.com(请不要加qq联系我)</big></p>
							</div>
						</div>
				</div>
			</div>
			)
	}
}
class Other extends React.Component{
	render(){
		return <div>

		</div>
	}
}
class MainWeb extends React.Component{
	constructor(props){
		super(props);
		this.state={
			headTitle:"firstWeb"
		}
	}
	componentDidMount(){
		center.register("main",this);
	}
	componentWillUnmount(){
		center.cancel("main")
	}
	componentDidEnter(){
		console.log("begin...")
	}
	componentWillEnter(){
		console.log("enter.....")
	}
	render(){
		let result = (<FirstWeb key={"1"}/>);
		let headTitle = this.state.headTitle;
		if(headTitle==="firstWeb"){
			result = (<FirstWeb key={"1"}/>);
		}else if(headTitle==="secondWeb"){
			result = (<SceondWeb key={"2"}/>);
		}else{
			result =<PageWeb key={"3"}/>
		}
		return (
			<ReactCSSTransitionGroup
          transitionName="context"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
				   {result}
				 </ReactCSSTransitionGroup >
			 )
	}
}
export {MainWeb,Root};
