import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Interceptor } from './api/Functions.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Interceptor>
        {/* <React.StrictMode> */}
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        {/* </React.StrictMode> */}
      </Interceptor>
    </BrowserRouter>
  </Provider>,
);
