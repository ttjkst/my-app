class Controller{
	constructor(name){
		this._name = name
		this._actions=[];
	}
	addAction(name,callback){
		this._actions.push({
			_name:name,
			_callback:callback
		})
	}
}
//need remove function???
class ControllerFactory{
	constructor(){
		this.controllers = [];
		//follow not need ?
		this.willCreateControllers = [];
		this.hasCreatedControllers = [];
	}
	createOne(name){
		let obj = {};
		obj._controller =  new Controller(name);
		obj.register = function(name,callback){
			 	this._controller.addAction(name,callback);
		}
		this.controllers.push(obj);
		return obj;
	}
	//no need??
	createWitchCenterRegister(filter){
		let obj ={};
		obj._filter = filter;
		obj._actions = [];
		obj.resgister = function(name,callback){
			this._actions.push({
				_name:name,
				_callback:callback
			})
		}
		this.willCreateControllers.push(obj);
		return obj;
	}
}
let  factory = new ControllerFactory();
//
class Center{
		constructor(){
				this._these = [];
		}
		register(controllerName,_this){
			console.log("register  controller:"+controllerName);
			this._these.push({
				_controllerName:controllerName,
				_this:_this
			})
			this.dispatch(controllerName,"init");
			return function (actionName){
					this.dispatch(controllerName,actionName);
			}
		}
		dispatch(controllerName,actionName,...rest){
			let controllerWapper = factory.controllers.find((x)=>x._controller._name===controllerName)
			let _thisWapper = this._these.find((x)=>x._controllerName===controllerName);
			if(controllerWapper!==undefined&&_thisWapper!==undefined){
				let action  = controllerWapper._controller._actions.find((x)=>x._name===actionName);
				if(action!==undefined){
					console.info(_thisWapper._this);
					action._callback(_thisWapper._this,this,rest);
				}
			}
		}
		dispatchByFilter(controllerNameFilter,actionName,...rest){
			let controllers = factory.controllers.filter((x)=>controllerNameFilter(x._controller._name))
			controllers.forEach((x)=>{
				let controller = x._controller;
				let _this = this._these.find((y)=>y._controllerName===x._controller._name);
				if(controller!==undefined&&_this!==undefined){
					let action  = controller._actions.find((x)=>x._name===actionName);
					if(action!==undefined){
						 action._callback(this,rest).bind(_this)
					}
				}
			})
		}
		//must need?
		dispatchLazy(){

		}
		cancel(controllerName){
			this._these = this._these.filter((x)=>x._controllerName!==controllerName)
			console.log("remove  controller:"+controllerName);
		}
}
let center = new Center();
export {center,factory};
