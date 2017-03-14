import React from 'react';
//import '../common/foo.js';
import {ModalHeader,ModalBody,ModalWithCloseButton} from './modal.js';
import {centers as center} from './controller.js';
import './foo.js';
import './homeAction.js';
class  LoginFrom extends React.Component{
	
}
class Modal extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isShow:true,
			username:"ssss",
			password:"mm"
		}
	}
	componentDidMount(){
		//center.resigter("modal",this);
	}
	componentDidUnMount(){
		//center.remove("modal");
	}
	changeUsername(e){
		console.info(this);
		//center.dispatch("modal","changeUsername",e.target.value);
	}
	changePassword(e){
		//center.dispatch("modal","changePassword",e);
	}
	render(){
		return <ModalWithCloseButton show={this.state.isShow?'show':'hide'}>
					<ModalHeader>Test Modal</ModalHeader>
					<ModalBody>
						  <form>
								    <div className="form-group">
									      	<label  className="control-label"  >用户名：</label>
									        <input  type="text" value={this.state.username} placeholder="请输入用户名"  onChange={this.changeUsername} className="form-control"/>
								       </div>
								       <div className="form-group">
									       	<label className="control-label" >密码：</label>
									       	<input  type="password" value={this.state.password} placeholder="请输入密码" onChange={this.changePassword}  className="form-control" />
								     	</div>
								     	<button type="button" className="btn btn-primary" onClick={this.hindleLogin} >登入</button>
							     </form>  	
					</ModalBody>
			</ModalWithCloseButton>
	}
}
export default Modal;
