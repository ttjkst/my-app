class  controllerHolder{
	constructor(){
		this.actions =[];
	}
	resigter(name,action){
		if(this.actions.find((x)=>x.name===name)!=undefined){
			throw new Error("action is in actions");
		}
		this.actions.push({
			action:action,
			name:name
		});
	}
	getAction(name){
		return this.actions.find((x)=>x.name===name);
	}
}
let holder = new controllerHolder();
class center{
	constructor(){
		this.acceptors =[];
	}
	resigter(name,_this){
		if(this.acceptors.findIndex((x)=>x.name===name)!=-1){
			throw new Error("acceptor is in acceptors");
		}
		this.acceptors.push({name:name,context:_this});
		this.dispatch(name,"init");
	}
	remove(name){
		this.dispatch(name,'destory');
		this.acceptors.filter((x)=>x.name!=name);
	}
	dispatch(name,action,rest){
		let callback = holder.getAction(name)
		if(callback!=undefined){
			let acceptor = this.acceptors.find((x)=>x.name===name);
			if(acceptor!=undefined){
				callback.action(action,acceptor.context,center,rest);
			}
		}
	}
}
class controllerFactory{
	constructor(){
	 	this.cotrollers = [];
	}
	createOne(name){
		let obj = new Object();
		obj._name = name;
		obj._callback = [];
		obj.register = function(name,callback){
			this._callback.push({
				actionName:name,
				doit:callback
			})
		}
		holder.resigter(name,(_name,_this,center,rest)=>{
			let callback = obj._callback.find((x)=>x.actionName===_name);
			if(callback!==undefined){
				callback.doit(_this,center,rest);
			}
		});
		this.cotrollers.push(obj);
		return obj;
	}
	destoryOne(name){
		let  needDestory = this.cotrollers.find((x)=>x._name=name);
		if(needDestory!=undefined){
			this.cotrollers =  this.controllers.filter((x)=>!x._name===name)
			//delete needDestory;
		}
	}
}
let centers = new center();
let factory = new controllerFactory();
export {centers,factory};
