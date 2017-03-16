class  ControllerHolder{
	constructor(){
		this.controllers =[];
		this.willDos = [];
	}
	storeWillDo(willDo){
		this.willDos.push(willDo);
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
		this.contexMaps =[];
	}
	register(name,_this){
		if(this.contexMaps.findIndex((x)=>x.name===name)!==-1){
			throw new Error("context is in contexts");
		}
		this.contexMaps.push({name:name,context:_this});
		this.dispatch(name,"init");
	}
	remove(name){
		this.dispatch(name,'destory');
		this.contexMaps = this.contexMaps.filter((x)=>x.name!==name);
	}
	dispatch(name,action,rest){
		let controller = holder.getController(name)
		let contextMap = this.contexMaps.find((x)=>x.name===name);
		if(controller!==undefined&&contextMap!==undefined){
			controller.action(action,contextMap.context,this,rest);
		}
	}
	dispatchLazy(name,action,rest){
		holder.storeWillDo({
			name:name,
			action:action,
			args:rest
		})
	}
}
let center = new Center();
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
			let contextMap = center.contexMaps.find((x)=>x.name===this._name);
				for(let {controllerName,action,args} of holder.willDos){
					if(controllerName===obj._name){
						if(action===name){
							if(contextMap!==undefined){
								callback(contextMap.context,center,args);
							}
						}
					}
				}
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
let factory = new ControllerFactory();
export {center,factory};



