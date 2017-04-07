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
    setTimeout(()=>$("#root").summernote(this.props.options),1000);
  }
  componentDidUpdate(prevProps, prevState){

  }
  render(){
    return <div id="root" ref="root">{this.props.value}</div>
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
           onImageUpload:function(files,editor,welEditable){
             let data = new FormData();
             data.append("file",files[0]);
             var xhr = new XMLHttpRequest();
             xhr.open("post","http://localhost:1086/image/save/");
             xhr.send(data);
             xhr.onreadystatechange= function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                         let url = '';
                         url += 'http://localhost:1086/image/get?name='+xhr.responseText;
                           $("#root").summernote('insertImage',url);
                          // $("#root").summernote('insertText', 'Hello, world')
                }
             }
           }
          // $.ajax({
          //      url: "http://localhost:1086/image/save/",
          //      type: "post",
          //      data:data,
          //      dataType: "jsonp",
          //      jsonp:"callback",
          //      processData:false,
          //      jsonpCallback:"callback",
          //      success: function(data){
          //          alert("data:" + data['function']);
          //      }
          //  });




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
