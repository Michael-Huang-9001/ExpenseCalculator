import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './components/navbar/Navbar';
import Container from './components/container/Container'
import registerServiceWorker from './registerServiceWorker';
import index from './js/index';


ReactDOM.render(
    <React.Fragment>
        <Navbar />
        <Container />
    </React.Fragment>,
    document.getElementById('root')
);
registerServiceWorker();
