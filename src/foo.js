import React from 'react';
import ReactDOM from 'react-dom';
import  buttom from "./lib-source/img/buttom.jpg";
var webRoot = window.webRoot;
var fooStyle={
	boxShadow:"0px -1px 0px rgb(231,231,231)",
	border:"1px solid #ddd",
	backgroundColor:"white",
	backgroundImage: "url("+buttom+")"
}
class DomChild extends React.Component{
	render(){
		return <div className="col-xs-4 col-md-3">
					    <a href={this.props.url} target="_blank" className="thumbnail text-center">
					      <img src={this.props.img} alt="..." className="img-responsive img-rounded"/>
					      	{this.props.preDes}<strong>·{this.props.nextDes}</strong>
					    </a>
				 </div>
	}
}
class Foo extends React.Component{
	render(){
		let DomList=this.props.list.map(function(e){
							return (
							<DomChild key={e.key} url={e.url} img={e.img} preDes={e.preDes} nextDes={e.next}/>
							)
						})
		return (
					  <div className="container-fluid buttom_background" style={fooStyle}   id="buttom">
					  	<div className="page-header">
							<h3>特别感谢：</h3>
							<div className="row">
					  		{DomList}
					  	</div>
							<h1 className="text-center text-primary">hellow world!</h1>
						</div>
						<h5 className="text-center text-primary"><strong>desiged   by    ttjkst</strong></h5>
					</div>
					)
	}
}
var list=[{"key":1,"url":"http://www.bootcss.com/ ","img":webRoot+"img/thinks/bootstrap.jpg","preDes":"一个强大的前端框架","next":"bootstrap"},
        			  {"key":2,"url":"http://summernote.org/ ","img":webRoot+"img/thinks/summernote.jpg","preDes":"一个强大的前端富文本编辑器","next":"summernote"},
        			  {"key":3,"url":"http://spring.io/ ","img":webRoot+"img/thinks/spring.jpg","preDes":"一个强大企业级后台的框架","next":"spring"},
        			  {"key":4,"url":"http://glyphicons.com/ ","img":webRoot+"img/thinks/font.jpg","preDes":"感谢其提供的免费的图标","next":"glyphicons"}]
ReactDOM.render(
  <Foo list={list}/>,
  document.getElementById('foo')
);
