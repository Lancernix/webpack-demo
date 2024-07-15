import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

const rootDom = document.getElementById('react-root');
if (rootDom) {
  ReactDom.render(<App />, rootDom);
}
