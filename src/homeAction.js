import {factory} from './controller.js'
let modalController = factory.createOne("modal");
modalController.register("init",(_this,center)=>{
	_this.setState({
		isShow:true
	})
})
modalController.register("closeModal",(_this)=>{
	_this.setState({
		isShow:false
	})
})
let  loginfromController = factory.createOne("LoginFrom");
loginfromController.register("changeUsername",(_this,center,rest)=>{
	console.info(_this);
	_this.setState({
		username:rest
	})
})
loginfromController.register("changePassword",(_this,center,rest)=>{
	console.info(_this);
	_this.setState({
		"password":rest
	})
})
loginfromController.register("clickLogin",(_this,center,rest)=>{
	let username = _this.state.username;
	let password = _this.state.password;
	//调用 modal close action
	center.dispatch("modal","closeModal");
})
