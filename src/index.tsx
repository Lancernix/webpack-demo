import { createRoot } from 'react-dom/client';
import App from './App';

const rootDom = document.getElementById('react-root');
if (rootDom) {
  const root = createRoot(rootDom);
  root.render(<App />);
}
