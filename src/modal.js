import React from 'react';
import $ from "jquery";
import "./lib-source/js/bootstrap/common/transition.js"
import "./lib-source/js/bootstrap/modal/modal.js"
import {center} from './controller.js';
class ModalHeader extends React.Component {
	getX(showX){
		let isShow = showX===undefined?showX===null?true:false:false;
	return isShow?(
		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
		<span aria-hidden="true">&times;</span>
		</button>
		)
	:"";
	}
	render(){
		const  {children,showX} = this.props;
		return(
			<div className='modal-header'>
				{this.getX(showX)}
				{children}
			</div>
		)
	}
}
class ModalBody extends React.Component{
	render(){
		const {children} = this.props;
		return (
			  <div className="modal-body">
				    {children}
			  </div>
		)
	}
}
class ModalWithCloseButton extends React.Component{
	constructor(props){
		super(props)
		this.isShow = props.isShow||false;
	}
	handleModalAction(isShow){
		setTimeout(()=>$(this.refs.root).modal(isShow===true?'show':'hide'),100);
		this.isShow = isShow;
	}
	componentDidMount(){
		center.register(this.props.componentName,this);
		setTimeout(()=>$(this.refs.root).modal(this.props.isShow===true?'show':'hide'),100);
		this.isShow = this.props.isShow;
		$(this.refs.root).on('hidden.bs.modal', function (e) {
				this.isShow = false;
		})
	}
	componentWillUnmount(){
		$(this.refs.root).off('hidden.bs.modal')
		center.cancel(this.props.componentName);
	}
	shouldComponentUpdate(nextProps,nextState){
		if(nextProps.show!==this.isShow){
			$(this.refs.root).modal(nextProps.isShow);
			this.isShow = nextProps.isShow
		}
		return true;
	}
	render(){
		const {children,componentName} = this.props;
		let Children = children;
		console.info(this.props)
		return (
			<div className="modal fade" ref="root">
				  <div className="modal-dialog">
				    <div className="modal-content">
				      		{children}
				      	<div className="modal-footer">
				        <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
				      </div>
				    </div>
				  </div>
				 </div>
		)
	}
}

export  {ModalHeader,ModalBody,ModalWithCloseButton};
