import React from 'react';
import {ModalHeader,ModalBody,ModalWithCloseButton} from './modal.js';
import {center} from './controller.js';
import './authenticationAction.js'
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
		center.cancel("LoginFrom");
	}
	changeUsername(e){
			this.setState({
				username:e.target.value
			})
	}
	changePassword(e){
		this.setState({
			password:e.target.value
		})
	}
	handleLogin(){
		center.dispatch("LoginFrom","clickLogin");
	}
	render(){
				return 		  <form>
								    <div className="form-group">
									      	<label  className="control-label"  >用户名：</label>
									        <input  type="text" value={this.state.username} placeholder="请输入用户名"  onChange={(e)=>this.setState({username:e.target.value})} className="form-control"/>
								       </div>
								       <div className="form-group">
									       	<label className="control-label" >密码：</label>
									       	<input  type="password" value={this.state.password} placeholder="请输入密码" onChange={(e)=>this.setState({password:e.target.value})}  className="form-control" />
								     	</div>
								     	<button type="button" className="btn btn-primary" onClick={this.handleLogin} >登入</button>
							     </form>
		}
}
class Modal extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return <ModalWithCloseButton isShow={true}  componentName={"AuthModal"}>
					<ModalHeader>权限认证</ModalHeader>
					<ModalBody>
							<LoginFrom/>
					</ModalBody>
			</ModalWithCloseButton>
	}
}
class Warning extends React.Component{
  render(){
    return <div className="alert alert-warning" role="alert">权限不够！请点击旁边的按钮进行再次认证<button onClick={()=>{
      center.dispatch("AuthModal","show")
    }} className="btn btn-info">@</button></div>
  }
}
class Root extends React.Component{
  render(){
    return <Warning/>
  }
}
export {Modal,Root};
