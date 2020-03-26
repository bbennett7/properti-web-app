import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

const Dropzone = props => {
  const { getRootProps, open, getInputProps, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
    uploadMultiple: false
  });

  return (
    <div className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
      </div>
    </div>
  )

};

export default Dropzone;