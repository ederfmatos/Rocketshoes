import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './routes';
import GlobalStyle from './styles/global';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';
import store from './store';

import history from './services/history';

import Header from './components/Header';

function App() {
	return (
		<Provider store={store}>
			<Router history={history}>
				<Header />
				<Routes />
				<GlobalStyle />
				<ToastContainer autoClose={3000} />
			</Router>
		</Provider>
	);
}

export default App;
