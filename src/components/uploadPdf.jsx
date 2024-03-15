import React, { useState } from 'react';

import CloseIcon from '../assets/closeIcon.png';
import Modal from 'react-modal';
import OpenIcon from '../assets/openIcon.png';
import PdfIcon from '../assets/pdfIcon.png';
import { PdfViewer } from './PdfViewer';
import axios from 'axios';

const UploadPDF = () => {
  const [file, setFile] = useState(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const handlePdfOpen = () => {
    setIsPdfOpen(true);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFileRemove = () => {
    setFile(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('pdfFile', file);

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/upload',
        formData
      );
      console.log(response.data);
      // Handle success or display a message to the user
    } catch (error) {
      console.error('Error uploading PDF:', error);
      // Handle error or display an error message to the user
    }
  };

  return (
    <>
      {!file ? (
        <form onSubmit={handleSubmit}>
          <div class='flex items-center justify-center w-[300px] '>
            <label
              for='dropzone-file'
              class='flex flex-col items-center justify-center w-full h-64 border-2 border-white border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
            >
              <div class='flex flex-col items-center justify-center pt-5 pb-6'>
                <svg
                  class='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 16'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                  />
                </svg>
                <p class='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                  <span class='font-semibold'>Click to upload</span> or drag and
                  drop
                </p>
                <p class='text-xs text-gray-500 dark:text-gray-400'>
                  Upload your resume in pdf format
                </p>
              </div>
              <input
                id='dropzone-file'
                type='file'
                class='hidden'
                accept='.pdf'
                onChange={handleFileChange}
              />
            </label>
          </div>
        </form>
      ) : (
        <div className=''>
          <div className='bg-gray-300 rounded-lg p-4 flex flex-row gap-x-[10px] items-center'>
            <img src={PdfIcon} alt='icon' className='h-[30px] w-[30px]' />
            <p className='text-[18px] font-bold'>{file.name}</p>
            <img
              src={OpenIcon}
              alt='icon'
              className='h-[40px] w-[40px] cursor-pointer'
              onClick={handlePdfOpen}
            />
            <img
              src={CloseIcon}
              alt='icon'
              className='h-[50px] w-[50px] cursor-pointer'
              onClick={handleFileRemove}
            />
          </div>
          <button
            onClick={handleSubmit}
            type='button'
            class=' mt-[20px] text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 '
          >
            Recommend Jobs
          </button>
        </div>
      )}
      <Modal isOpen={isPdfOpen}>
        <div className='flex justify-end sticky top-[0px]'>
          <img
            src={CloseIcon}
            alt='icon'
            className='h-[60px] w-[60px] cursor-pointer'
            onClick={() => {
              setIsPdfOpen(false);
            }}
          />
        </div>

        <PdfViewer file={file} />
      </Modal>
    </>
  );
};

export default UploadPDF;
