import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './components/navbar/Navbar';
import Container from './components/container/Container'
import registerServiceWorker from './registerServiceWorker';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Container />
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
registerServiceWorker();

export default App;
