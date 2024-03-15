import './App.css';

import Image from './assets/image1.jpeg';
import Modal from 'react-modal';
import { Tabs } from './components/Tabs';
import UploadPDF from './components/uploadPdf';

Modal.setAppElement('#root');
function App() {
  return (
    <div className='App flex flex-col w-full items-center justify-center'>
      <Tabs />
      <img src={Image} alt='icons' />
      <UploadPDF />
    </div>
  );
}

export default App;
