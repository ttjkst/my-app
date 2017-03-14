import {factory} from './controller.js'
var modalController = factory.createOne("modal");
modalController.register("init",(_this,center)=>{
	_this.setState({
		isShow:true
	})
})
modalController.register("changeUsername",(_this,center,rest)=>{
	console.info(_this);
	_this.setState({
		"username":rest
	})
})
modalController.register("changePassword",(_this,center,rest)=>{
	_this.setState({
		"password":rest
	})
})
