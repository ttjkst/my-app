import React from 'react';
//import '../common/foo.js';
import {ModalHeader,ModalBody,ModalWithCloseButton} from './modal.js';
import {center} from './controller.js';
import './foo.js';
import './homeAction.js';
import {NavBarHeader,NavBar} from './head.js'
import 'lib-source/css/mine/mycss.css'
class HeaderTabs extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tabDatas:[
            {key:1,	text:"首页",			css:""},{key:2,	text:"关于本站与我",	css:""},
            {key:3,	text:"编程之外",		css:""},{key:4,	text:"编程与思考",	css:""}
			]}
	}
	componentDidMount(){
		center.register("HeaderTabs",this);
	}
	componentWillUnmount(){
		center.remove("HeaderTabs");
	}
	handleClick(e){
		center.dispatch("HeaderTabs","handleClick",e);
	}
	render(){ 
		const tabs = this.state.tabDatas.map(({key,css,text})=>{
			return <li key={key} role="presentation"  className={css}><a  key={key} onClick={this.handleClick} href="Javascript:void(0)">{text}</a></li>
		}) 
		return <div className="">
				<ul className="nav navbar-nav" >
					{tabs}
				</ul>
			</div>
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

class  LoginFrom extends React.Component{
	constructor(props){
		super(props);
		this.state={
			username:"",
			password:""
		}
	}
	componentDidMount(){
		center.register("LoginFrom",this);
	}
	componentWillUnmount(){
		center.remove("LoginFrom");
	}
	changeUsername(e){
		center.dispatch("LoginFrom","changeUsername",e.target.value);
	}
	changePassword(e){
		center.dispatch("LoginFrom","changePassword",e.target.value);
	}
	handleLogin(){
		center.dispatch("LoginFrom","clickLogin");
	}
	render(){
				return 		  <form>
								    <div className="form-group">
									      	<label  className="control-label"  >用户名：</label>
									        <input  type="text" value={this.state.username} placeholder="请输入用户名"  onChange={this.changeUsername} className="form-control"/>
								       </div>
								       <div className="form-group">
									       	<label className="control-label" >密码：</label>
									       	<input  type="password" value={this.state.password} placeholder="请输入密码" onChange={this.changePassword}  className="form-control" />
								     	</div>
								     	<button type="button" className="btn btn-primary" onClick={this.handleLogin} >登入</button>
							     </form>
		}
}
class Modal extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isShow:true,
		}
	}
	componentDidMount(){
		center.register("modal",this);
	}
	componentWillUnmount(){
		center.remove("modal");
	}
	render(){
		return <ModalWithCloseButton show={this.state.isShow?'show':'hide'}>
					<ModalHeader>Test Modal</ModalHeader>
					<ModalBody>
							<LoginFrom/>
					</ModalBody>
			</ModalWithCloseButton>
	}
}
//main
class  FirstWeb extends React.Component{
		render(){
					return <div className="jumbotron base_background">
						<div className="container">
							<h1>我</h1>
							<p>有一个梦想</p>
							<p>希望生活的喧嚣消失</p>
							<p>自己不会茫然</p>
						</div>
					</div>
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
		center.remove("main")
	}
	render(){
		let result = (<FirstWeb/>);
		let headTitle = this.state.headTitle;
		if(headTitle==="firstWeb"){
			result = (<FirstWeb/>);
		}else if(headTitle==="secondWeb"){
			result = (<SceondWeb/>);
		}
		console.info(result)
		return result
	}
}
export {Modal,MainWeb,Root} ;
