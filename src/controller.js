class  ControllerHolder{
	constructor(){
		this.controllers =[];
	}
	register(name,action){
		if(this.controllers.find((x)=>x.name===name)!==undefined){
			throw new Error("action is in actions");
		}
		this.controllers.push({
			action:action,
			name:name
		});
	}
	getController(name){
		return this.controllers.find((x)=>x.name===name);
	}
}
let holder = new ControllerHolder();
class Center{
	constructor(){
		this.components =[];
	}
	register(name,_this){
		if(this.components.findIndex((x)=>x.name===name)!==-1){
			throw new Error("acceptor is in acceptors");
		}
		this.components.push({name:name,context:_this});
		this.dispatch(name,"init");
	}
	remove(name){
		this.dispatch(name,'destory');
		this.components = this.components.filter((x)=>x.name!==name);
	}
	dispatch(name,action,rest){
		let controller = holder.getController(name)
		let component = this.components.find((x)=>x.name===name);
		if(controller!==undefined&&component!==undefined){
			controller.action(action,component.context,center,rest);
		}
	}
}
class ControllerFactory{
	constructor(){
	 	this.controllers = [];
	}
	createOne(name){
		let obj = {};
		obj._name = name;
		obj._callback = [];
		obj.register = function(name,callback){
			this._callback.push({
				actionName:name,
				doit:callback
			})
		}
		holder.register(name,(_name,_this,center,rest)=>{
			let callback = obj._callback.find((x)=>x.actionName===_name);
			if(callback!==undefined){
				callback.doit(_this,center,rest);
			}
		});
		this.controllers.push(obj);
		return obj;
	}
	destoryOne(name){
		let  needDestory = this.controllers.find((x)=>x._name=name);
		if(needDestory!==undefined){
			this.controllers =  this.controllers.filter((x)=>!x._name===name)
			//delete needDestory;
		}
	}
}
let center = new Center();
let factory = new ControllerFactory();
export {center,factory};



