import {factory} from './controller.js'
let modalController = factory.createOne("modal");
modalController.register("init",(_this,center)=>{
	_this.setState({
		isShow:true
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
