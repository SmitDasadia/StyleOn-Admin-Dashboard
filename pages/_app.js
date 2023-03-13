/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/style.scss";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {


  
  
  return (
    <>
      
        <Component {...pageProps} />
      
    </>
  );
}

export default MyApp;
