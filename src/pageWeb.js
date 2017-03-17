import React from 'react';
class  PageContext extends React.Component {
  constructor(props) {
      super(props);
      this.state={

      }
  }
  render(){
    return   <div className="panel panel-info">
              <div className="panel-title"><h3>this is title !</h3></div>
              <div className="panel-body">
                Basic panel example
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
