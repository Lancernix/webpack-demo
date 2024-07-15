import React from 'react';
import './App.less';
import bigdog from './assets/bigdog.jpg';
import smalldog from './assets/smalldog.jpg';

import SimpleModal from 'components/SimpleModal';
import { TableButton } from 'scc-oms-components';

function App() {
  return (
    <>
      <h2>Hello Webpack</h2>
      <br />
      <p className="blue-text">这是一段蓝色的文字</p>
      <br />
      <SimpleModal />
      <br />
      <img src={smalldog} alt="小狗" />
      <br />
      <img src={bigdog} alt="大狗" />
      <br />
      <div className="with-bg" />
      <br />
      <div style={{ width: 120, height: 160, backgroundImage: `url(${smalldog})` }} />
      <br />
      <TableButton>组件库中的按钮</TableButton>
    </>
  );
}

export default App;
