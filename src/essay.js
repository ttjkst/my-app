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
    return <div ref="root">{this.props.value}</div>
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
         ,
         callbacks:{
           onImageUpload:function(files){
             let data = new FormData(files[0]);
             var xhr = new XMLHttpRequest();
             xhr.open("post","http://localhost:1086/image/save/");
             xhr.send(data);
             xhr.onreadystatechange= function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                         let result = '';
                         result += '<img src="' + 'http://localhost:1086/image/save/get?name='+xhr.responseText + '">';
                         $(this).summernote('insertNode',result);
                }
             };
           }
         }//end with callbaks
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
