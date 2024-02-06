import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormikContext } from 'formik';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiFile, FiAlertCircle } from 'react-icons/fi';
import { IoMdImages, IoIosDocument } from 'react-icons/io';

const FileDropZone = ({ name }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    if (values[name]) {
      setFile(values[name]);
    }
  }, [values, name]);

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        // Handle file rejections due to constraints (e.g., file size)
        setError(`File is too large. Max size is 5MB.`);
        setFile(null);
        setFieldValue(name, null);
        return;
      }

      // Assuming you have a function to handle the file upload process
      const currentFile = acceptedFiles[0];
      if (currentFile) {
        setError(''); // Clear any previous error
        setFile(currentFile);
        setFieldValue(name, currentFile); // Update Formik's state

        // Reset upload progress and simulate file upload progress
        setUploadProgress(0);
        const progressInterval = setInterval(() => {
          setUploadProgress((oldProgress) => {
            if (oldProgress >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return oldProgress + 10;
          });
        }, 100);
      }

      // TODO: Implement actual upload logic here
    },
    [setFieldValue, name]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 5 * 1024 * 1024, // 5MB limit
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.bmp'],
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
  });

  return (
    <motion.div
      {...getRootProps()}
      className="border-dashed border-4 border-gray-200 dark:border-gray-600 p-6 m-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <input {...getInputProps()} />
      <motion.div className="space-y-2">
        <FiUploadCloud size={50} className="mx-auto" />
        <p>Drag 'n' drop your certificate here, or click to select files</p>
        <div className="flex justify-center items-center space-x-2">
          <IoMdImages size={40} />
          <IoIosDocument size={40} />
        </div>
        {error && (
          <p className="text-red-500 flex items-center">
            <FiAlertCircle className="mr-2" />
            {error}
          </p>
        )}
      </motion.div>
      {file && (
        <div className="mt-4">
          <FiFile size={16} className="inline mr-2" />
          <span>File: {file.name}</span>
          <motion.progress
            className="progress progress-success w-56"
            value={uploadProgress}
            max="100"
            initial={{ width: 0 }}
            animate={{ width: uploadProgress + '%' }}
          >
            {uploadProgress}%
          </motion.progress>
        </div>
      )}
    </motion.div>
  );
};

export default FileDropZone;
