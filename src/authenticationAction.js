import {factory} from './controller.js'
import $ from 'jquery'
//modal controller
let modalController = factory.createOne("AuthModal");
modalController.register("init",(_this,center)=>{
	center.dispatch("AuthModal","show")
})
modalController.register("show",(_this,center)=>{
	_this.handleModalAction(true)
})
modalController.register("hide",(_this)=>{
  _this.handleModalAction(false)
})
let authenticationController = factory.createOne("LoginFrom");
authenticationController.register("clickLogin",(_this,center)=>{
	let {username,password} = _this.state;
	if(username===""||password===""){
		return;
	}
	let date = {
		url:window.goto,
		username:username,
		password:password
	}
	$.ajax(
		"http://localhost:8080/blog/loginAndNotJump",{
		data:date,
		type:'get',
		cache: false,
		crossDomain:true,
		success:function(data,texStatus,jqXHR){
			center.dispatch("AuthModal","hide");
				window.open(window.go)
				window.close();
		},
		error:function(){
				center.dispatch("AuthModal","hide");
		}
	})
})
