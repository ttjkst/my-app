import {factory} from './controller.js'
//modal controller
let modalController = factory.createOne("modal");
modalController.register("init",(_this,center)=>{
	center.dispatch("AuthModal","show")
})
modalController.register("AuthModal",(_this,center)=>{
	_this.handleModalAction(true)
})
modalController.register("AuthModal",(_this)=>{
  _this.handleModalAction(false)
})
let authenticationController = factory.createOne("LoginFrom");
authenticationController.register("clickLogin",(_this)=>{
	console.info(_this);
})
