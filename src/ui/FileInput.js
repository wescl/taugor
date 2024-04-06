import React, { useRef, useState } from 'react';
import './FileInput.scss';
import { FaCamera } from "react-icons/fa";

const FileInput = ({ onChange, fotoPerfil }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
    onChange(file);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="file-input-container">
      {selectedFile ? (
        <div className="file-preview">
          <img src={selectedFile} alt="Preview" />
        </div>
      ) : (
        <div className="file-preview">
          <div className="file-input-button" onClick={handleClick}>
            <FaCamera />
          </div>
          {fotoPerfil ? (
            <img src={fotoPerfil} alt="Preview" />
          ) : (
            <img src="https://t4.ftcdn.net/jpg/00/65/77/27/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" alt="No Preview" />
          )}
        </div>
      )}
      <input
        type="file"
        ref={inputRef}
        className="file-input-label"
        onChange={handleInputChange}
      />

    </div>
  );
};

export default FileInput;
