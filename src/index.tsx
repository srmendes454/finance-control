import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { MainProvider } from './store/MainProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <MainProvider>
    <App />
  </MainProvider>
);
