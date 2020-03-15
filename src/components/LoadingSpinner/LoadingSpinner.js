import React from 'react';
import Lottie from 'react-lottie';
import Animation from '../../assets/9582-liquid-4-dot-loader.json';

const LoadingSpinner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return <Lottie options={defaultOptions} height={400} width={400} />;
};

export default LoadingSpinner;
