import {factory} from './controller.js'
let essayController = factory.willCreareOne("test1");
console.info(essayController)
essayController.register("save",(_this,center)=>{
  console.info(_this.state)
})
