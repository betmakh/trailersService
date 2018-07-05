import React from 'react';
import { render } from 'react-dom';

import Layout from './Layout.jsx';

var Comp  = () => (<b>asd</b>);

// console.log("document.getElementById('root')", document.getElementById('root'));
// render(<Comp/>, document.getElementById('root'));
render(<Layout/>, document.getElementById('root'));