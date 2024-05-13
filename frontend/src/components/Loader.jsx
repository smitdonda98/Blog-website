import React from 'react';
import LoadingGif from '../images/spin2.gif'
// import { HashLoader } from "react-spinners";
// import HashLoader from 'react-spinners'; // Import HashLoader from react-spinners

const Loader = () => {
  return (
    <>
    <div className="loader">
      <div className="loader__image">
        <img src={LoadingGif} alt="" className='img_loader' />
      </div>
    </div>
    </>
  );
};

export default Loader