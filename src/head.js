import React from 'react';
import "../../lib-source/css/mine/mycss.css";
import  buttom from "../../lib-source/img/buttom.jpg";

var NavBarStyle={
	backgroundImage: "url("+buttom+")"
}
class NavBar extends React.Component{
	render(){
		const {children} = this.props;
		console.info(buttom);
		return <nav className="nav navbar-default" style={NavBarStyle} >
			<div className="container-fluid">
	       		<div className="page-header">
					 	<h1>ttjkst</h1>
					 	<h4>Hard work,try to make mistakes and try to current it!</h4>
				</div> 
	       		{children}
			</div>
		</nav>
	}
}
class NavBarHeader extends React.Component{
	render(){
		const {children} = this.props;
		return (
			<div className="navbar-header " >
	      	 	<div className="collapse navbar-collapse">
	      	 		{children}
	      	 	</div>
			</div>
		)
	}
}

export {NavBarHeader,NavBar}
