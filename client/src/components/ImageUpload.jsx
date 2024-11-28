import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function ImageUpload({ onImageUpload, isLoading }) {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    multiple: false,
    maxSize: 5242880, // 5MB
    disabled: isLoading
  });

  const handleUpload = () => {
    if (selectedFile) {
      onImageUpload(selectedFile);
    }
  };

  return (
    <div className="text-center">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 mb-4 cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : isLoading ? 'border-gray-300 bg-gray-50 cursor-not-allowed' : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div>
            <img src={preview} alt="Preview" className="mx-auto max-h-64 mb-2" />
            <p className="text-sm text-gray-500">
              {selectedFile ? `Selected: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)` : ''}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-gray-500">
              {isLoading ? 'Processing...' : 'Drag and drop an image here, or click to select a file'}
            </p>
            <p className="text-sm text-gray-400 mt-2">Supported formats: JPG, PNG (max 5MB)</p>
          </div>
        )}
      </div>
      
      <button
        onClick={handleUpload}
        disabled={!selectedFile || isLoading}
        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
          !selectedFile || isLoading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Image'}
      </button>
    </div>
  );
}

export default ImageUpload;
