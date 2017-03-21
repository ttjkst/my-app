import React from 'react';
import {center} from './controller.js';
let pageContextNum = 0
class  PageContext extends React.Component {
  constructor(props) {
      super(props);
      this.state={
          content:"Basic panel example",
          show:true
      }
      this.id = pageContextNum++;
  }
  componentDidMount(){
      center.register("pageContext"+pageContextNum,this.id);
      pageContextNum++;
  }
  componentWillUnmount(){
    center.cancel("pageContext"+this.id);
  }
  handleClick(){
  }
  render(){
    return   <div className="panel panel-info" style={{display:!this.state.show?"none":"run-in"}}>
              <div className="panel-title"><h3>this is title !</h3></div>
              <div className="panel-body">
                {this.state.content}
              </div>
              <div className="panel-footer">
                <button type="button" className="btn btn-info" >展开</button>
              </div>
            </div>
  }
}
class PageContexts extends React.Component{
    constructor(props){
      super(props)
      this.state={
        manys:[1,2,3,4,5],
        key:""
      }
    }
    changeKey(e){
      this.setState({
        key:e.target.value
      })
    }
      render(){
        let pageContexts =this.state.manys.map((key)=>{
          return <PageContext key={key} />
        })
        console.info(pageContexts);
        return <div className='container' style={{backgroundColor:"#e7e7e7"}}>
        <div className="input-group" style={{marginTop:"10px",marginBottom:"10px"}} >
          <input type="text" placeholder="输入你感兴趣的关键字" className="form-control" onChange={this.changeKey} value={this.state.key} name="key"/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button">Search!</button>
          </span>
        </div>
        {pageContexts}
        </div>
      }
}
export default PageContexts;
