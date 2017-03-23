import  React from 'react';
import $ from 'jquery';
class BasicAnimationBox extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    if(this.props.enter_start!==undefined&&this.props.enter_end!==undefined){
      setTimeout(()=>{$(this.refs.root).addClass(this.props.enter_end)},this.props.delay)
    }
  }
  componentWillUnmount(e){
    if(this.props.leave_start!==undefined&&this.props.leave_end!==undefined){
      $(this.refs.root).attr({"class":this.props.leav_start});
      $(this.refs.root).addClass(this.props.leave_end);
      setTimeout((x)=>{console.info("ssss")},100000);
      console.info(e)
    }
  }
  render(){
    let  {children,...rest} =this.props;
    return <div ref ="root"  className={this.props.enter_start}>
      {children}
    </div>
  }
}
export {BasicAnimationBox}
