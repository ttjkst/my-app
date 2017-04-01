import React from 'react';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import $ from "jquery";
import './lib-source/js/react-summernote/lang/summernote-zh-CN';
import "./lib-source/js/bootstrap.min.js"
class CreateEssayUI extends React.Component{
  onChange(){

  }
  render(){
    return (
     <ReactSummernote
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
