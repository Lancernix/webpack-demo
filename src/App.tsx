import './App.less';
import bigdog from './assets/bigdog.jpg';
import smalldog from './assets/smalldog.jpg';

function App() {
  return (
    <>
      <h2>Hello Webpack</h2>
      <br />
      <p className='blue-text'>这是一段蓝色的文字</p>
      <br />
      <img src={smalldog} alt='小狗' />
      <br />
      <img src={bigdog} alt='大狗' />
      <br />
      <div className='with-bg' />
      <br />
      <div style={{ width: 120, height: 160, backgroundImage: `url(${smalldog})` }} />
    </>
  );
}

export default App;
