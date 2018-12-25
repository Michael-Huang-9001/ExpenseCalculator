import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './components/navbar/Navbar';
import Container from './components/container/Container'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

import Store from './redux/store';

class App extends React.Component {
    render() {
        return (
            <Provider store={Store}>
                <React.Fragment>
                    <Navbar />
                    <Container />
                </React.Fragment>
            </Provider>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
registerServiceWorker();

export default App;
