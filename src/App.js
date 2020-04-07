import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import GlobalStyle from './styles/global';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';
import store from './store';

import Header from './components/Header';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Header />
				<Routes />
				<GlobalStyle />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
