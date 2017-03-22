import {factory} from './controller.js'
//modal controller
let modalController = factory.createOne("modal");
modalController.register("init",(_this,center)=>{
	_this.setState({
		isShow:false
	})
})
modalController.register("closeModal",(_this)=>{
	this.setState({
		isShow:false
	})
})
//loginfrom controller
let  loginfromController = factory.createOne("LoginFrom");
loginfromController.register("changeUsername",(_this,center,rest)=>{
	_this.setState({
		username:rest
	})
})
loginfromController.register("changePassword",(_this,center,rest)=>{
	console.info(this);
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
//li controller
let headerController = factory.createOne("HeaderTabs");
headerController.register("init",(_this)=>{
	_this.setState({
		tabDatas:[
				{key:1,	text:"首页",			css:"active"},{key:2,	text:"关于本站与我",	css:""},
        {key:3,	text:"bolg",		css:""		}
        ]
	})
})
headerController.register("handleClick",(_this,center,rest)=>{
	let tab = _this.state.tabDatas;
	let selected = rest[0].target.firstChild.data;
	let mainName = "firstWeb";
	tab.forEach((x)=>{
		if(x.text===selected){
			if(x.css!=="active"){
				x.css="active"
			}
		}else{
			x.css="";
		}
	})
	_this.setState({tabDatas:tab})
	if(selected==="首页"){
		mainName = "firstWeb";
	}else if(selected==="关于本站与我"){
		mainName = "secondWeb";
	}else {
		mainName = "bolg";
	}
	//
	center.dispatch("main","changeMain",mainName);
})
//main  controller
let mainController = factory.createOne("main");
mainController.register("init",(_this)=>{
	_this.setState({
		headTitle:"firstWeb", //"firstWeb"
	})
})
mainController.register("changeMain",(_this,center,rest)=>{
	_this.setState({
		headTitle:rest[0]
	})
})
/*factory.createRealFunction("showMore",function(){
	this.setState({
		content:"sasasdkjashdasdkjasjldkasjdlkajdklasjdklasjdlkajdlkasjdlkasdjaklsjdaklsdjaslkdjaklsdjalskdjaslkdjasl"
		+"kdjaskldjaslkdjalskdjasd"
	})
	center.dispatchFilter((x)=>{
		return x.name.indexOf("pageContext")!==-1||x.name!=="pageContext"+this.id;
	},"close")
})*/

//controllers
/*let pageContextControllers = factory.create((x)=>x.name.indexOf("pageContext")!==-1);
pageContextControllers.register("close",(_this,center,rest)=>{
	_this.setState({show:false})
})*/
