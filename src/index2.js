import React from 'react';
import ReactDOM from 'react-dom';
import {ModalHeader,ModalBody,ModalWithCloseButton} from  './common/modal/model.js'

class  TestDom extends React.Component{
	constructor(props){
		super(props);
		this.state={
			show:"hide"
		}
	}
	handleTest(commend){
		this.setState({
			show:commend
		})
	}
	componentDidMount(){
		TestDom.handle = this.handleTest.bind(this);
	}
	render(){
		return (
			<ModalWithCloseButton show={this.state.show}>
				<ModalBody>this is body</ModalBody>
			</ModalWithCloseButton>
		)
	}
}
window.modal =   TestDom;

ReactDOM.render(<TestDom/>,
		document.getElementById('root'))
