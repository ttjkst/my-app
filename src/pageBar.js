import React from 'react';
import {center} from './controller.js';
class PageBarChildren extends React.Component{
    constructor(props){
      super(props)
    }
    getCssByActionState(){
      if(this.props.actionState==="clicked"){
        return "active";
      }
      else if(this.props.actionState==="disable")
      {
        return "disabled"
      }
      return "";
    }
    handleClick(e){
      console.info(this.props)
      if(this.props.actionState!=="disable"&&this.props.actionState!=="clicked"){
          center.dispatch(this.props.beTelled,"clickNo",e.target.firstChild.textContent)
      }
    }
    render(){
      const {children} = this.props;
      return  <li  className={this.getCssByActionState()}><a href="#" onClick={this.handleClick.bind(this)}  >{children}</a></li>
    }
}
let checkPageBarData = function(totalPage,currNo,size) {
  if(totalPage<=0){
    return false;
  }
  if(currNo>totalPage||currNo<=0){
    return false;
  }
  if(size<=0){
    return false;
  }
  return true;
}
let  createPagetagList = function(totalPage,currNo,size){
					let key = size/2+1;
					let e=null;
          let list = [];
					let beginNo = currNo-key<=0?1:currNo-key;
					let endNo = totalPage-currNo<=size-1?totalPage:beginNo+size-1;
					if(beginNo>1){
						e={"key":totalPage+1,"actionState":"disable","value":"..."};
						list.push(e);
					}

					for(var i=beginNo;i<=endNo;i++){
						e={"key":i,"actionState":i===currNo?"clicked":"","value":i};
						list.push(e);
					}

					if(totalPage>endNo){
						e={"key":totalPage+2,"actionState":"disable","value":"..."};
						list.push(e);
            e={"key":totalPage,"actionState":"","value":totalPage};
						list.push(e);
					}
					return list;
}
class PageBar extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    let pageNoList = [];
    if(checkPageBarData(this.props.totalPage,this.props.currNo,this.props.size)){
    pageNoList =  createPagetagList(this.props.totalPage,this.props.currNo,this.props.size).map((e)=>{
        return <PageBarChildren beTelled={this.props.beTelled} key={e.key} actionState={e.actionState}>{e.value}</PageBarChildren>
      })
    }

  return (
					<div className="text-center">
								<nav>
								  <ul className="pagination">
								    <li id="parentPrevious">
								      <a href="#" aria-label="Previous" onClick={()=>center.dispatch(this.props.beTelled,"prev")} className={0===this.props.currNo?"disappear":""}>
								        <span aria-hidden="true">«</span>
								      </a>
								    </li>
								   		{pageNoList}
								    <li id="parentNext">
								      <a href="#" aria-label="Next"     onClick={()=>center.dispatch(this.props.beTelled,"next")}  className={this.props.totalPage===this.props.currNo?"disappear":""}>
								        <span aria-hidden="true">»</span>
								      </a>
								    </li>
								  </ul>
							</nav>
						</div>
						)
  }
}
export default PageBar;
