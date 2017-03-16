import React from 'react';
import ReactDOM from 'react-dom';
import {Modal,MainWeb,Root} from './home.js';
ReactDOM.render(<Modal/>,
		document.getElementById('modal')
		)
ReactDOM.render(<Root/>,
		document.getElementById('root')
)
ReactDOM.render(<MainWeb/>,
		document.getElementById('main')
)
