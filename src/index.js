import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './i18n';
import { SignContextProvider } from './context/signContext';
import { RealTimeProvider } from './context/RealTimeContext';
import { ContentContextProvider } from './context/contentContext';
import { HomeContextProvider } from './context/homeContext';
import { VideoContextProvider } from './context/videoContext';
import { HomeTypeContextProvider } from './context/homeTypeContext';
import { MyListContextProvider } from './context/myListContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RealTimeProvider>
      <ContentContextProvider>
        <HomeContextProvider>
          <VideoContextProvider>
            <HomeTypeContextProvider>
              <SignContextProvider>
                <MyListContextProvider>
                  <App />
                </MyListContextProvider>
              </SignContextProvider>
            </HomeTypeContextProvider>
          </VideoContextProvider>
        </HomeContextProvider>
      </ContentContextProvider>
    </RealTimeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
