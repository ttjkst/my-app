import React from 'react';
import 'react-summernote/dist/react-summernote.css'; // import styles
import $ from "jquery";
import "./lib-source/js/bootstrap.min.js"
import 'react-summernote/dist/react-summernote.js';
import './lib-source/js/react-summernote/lang/summernote-zh-CN.js';
class SummernoteBasic extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    setTimeout(()=>$(this.refs.root).summernote(this.props.options),1000);
  }
  componentDidUpdate(prevProps, prevState){

  }
  render(){
    return <div ref="root">this.props.value</div>
  }
}
class CreateEssayUI extends React.Component{
  onChange(){

  }
  render(){
    return (
     <SummernoteBasic
       value="Default value"
       options={{
         lang: 'ru-RU',
         height: 350,
         dialogsInBody: true,
         toolbar: [
           ['style', ['style']],
           ['font', ['bold', 'underline', 'clear']],
           ['fontname', ['fontname']],
           ['para', ['ul', 'ol', 'paragraph']],
           ['table', ['table']],
           ['insert', ['link', 'picture', 'video']],
           ['view', ['fullscreen', 'codeview']]
         ]
       }}
       onChange={this.onChange}
     />
   )
  }
}
class Root extends React.Component{
  render(){
    return <CreateEssayUI/>
  }
}
export {Root};
