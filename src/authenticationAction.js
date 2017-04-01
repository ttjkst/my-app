import {factory} from './controller.js'
//modal controller
let modalController = factory.createOne("modal");
modalController.register("init",(_this,center)=>{
	center.dispatch("modal","show")
})
modalController.register("show",(_this,center)=>{
	_this.handleModalAction(true)
})
modalController.register("closeModal",(_this)=>{
  _this.handleModalAction(false)
})
