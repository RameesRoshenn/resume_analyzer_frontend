import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const FileUpload = ({ onTextExtracted }) => {
  const [fileName, setFileName] = useState('');
  const [text, setText] = useState('');

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
      let finalText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        finalText += `${pageText}\n`;
      }
      setText(finalText);
      onTextExtracted(finalText);
    };
    reader.readAsArrayBuffer(file);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileName(file.name);
    if (file.type === 'application/pdf') {
      extractTextFromPDF(file);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setText(reader.result);
        onTextExtracted(reader.result);
      };
      reader.readAsText(file);
    }
  }, [onTextExtracted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt']
    },
    maxFiles: 1
  });

  return (
    <div className="upload-section">
      <h3>Upload Resume</h3>
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <p>{isDragActive ? 'Drop file...' : 'Drag & drop resume (PDF or TXT) or click to select'}</p>
      </div>
      {fileName && <p>Selected: {fileName}</p>}
      <div className="text-preview">
        <textarea value={text} onChange={(e) => {
          setText(e.target.value);
          onTextExtracted(e.target.value);
        }} rows={10} />
      </div>
    </div>
  );
};

export default FileUpload;
