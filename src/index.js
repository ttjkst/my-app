// import React from 'react';
// import ReactDOM from 'react-dom';
// import {MainWeb,Root} from './home.js';
// import 'bootstrap/dist/css/bootstrap.css';
// // ReactDOM.render(<Modal/>,
// // 		document.getElementById('modal')
// // 		)
// ReactDOM.render(<Root/>,
// 		document.getElementById('root')
// )
// ReactDOM.render(<MainWeb/>,
// 		document.getElementById('main')
// )
// import React from 'react';
// import ReactDOM from 'react-dom';
// import {Modal,Root} from './essay.js';
// import 'bootstrap/dist/css/bootstrap.css';
// import './essayAction.js'
// // ReactDOM.render(<Modal/>,
// // 		document.getElementById('modal')
// // 		)
//
// ReactDOM.render(<Root/>,
// 		 		document.getElementById('root')
// )

// import React from 'react';
// import ReactDOM from 'react-dom';
// import {Modal,Root} from './authentication.js';
// // import {Nav} from "./navForManger.js"
// // import {Modal,Root} from './essay.js';
// import 'bootstrap/dist/css/bootstrap.css';
// import './essayAction.js'
// ReactDOM.render(<Modal/>,
// 		document.getElementById('root')
// 		)
// ReactDOM.render(<Root/>,
// 		 		document.getElementById('main')
//)
import React from 'react';
import ReactDOM from 'react-dom';
import PageContexts from './manager.js'
import 'bootstrap/dist/css/bootstrap.css';
console.info(PageContexts)
ReactDOM.render(<PageContexts/>,
		 		document.getElementById('main')
 )
