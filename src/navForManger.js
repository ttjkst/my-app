import React from 'react';
import {ModalHeader,ModalBody,ModalWithCloseButton} from './modal.js';
import {center} from './controller.js';

let NavColor={
  color:"#F5F5F5"
}
let  NavBackColor={
  backgroundColor:"#763C67"
}
class Nav extends React.Component{
  render(){
    return <nav className="navbar navbar-default" style={NavBackColor}>
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" style={NavColor} href="#">Ttjkst</a>
              </div>
              <p className="navbar-text" style={NavColor}>Hard work and lean,try to make mistakes and try to correct it!</p>
              <button type="button" className="btn btn-info navbar-btn navbar-left">创建</button>
                <form className="navbar-form navbar-left" action="#">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="搜你想要的东西" />

                  </div>
                    <button type="submit" className="btn btn-default">Go!</button>
                </form>
              </div>
      </nav>
  }
}


export {Nav};
