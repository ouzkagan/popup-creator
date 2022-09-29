import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function FileInput({ required, input, dropZoneProps, ...props }) {
  const onDrop = useCallback(
    (files) => {
      input.onChange(files);
    },
    [input]
  );

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    noDrag: true,
    ...dropZoneProps,
  });

  const files = acceptedFiles.map((file) => (
    <span key={file.path}>
      {file.path} - {file.size} bytes
    </span>
  ));

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} multiple={false} />
      <button {...props}>{props.label || 'choose file'}</button>
      {files}
    </div>
  );
}

export default FileInput;
