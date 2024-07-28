import React, { useState } from 'react';


function SteganographyAppPage() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [resultImage, setResultImage] = useState(null);
  const [decodedText, setDecodedText] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const encodeTextToImage = () => {
    if (!image || !text) {
      alert("Please select an image and enter text.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const textBinary = text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
        const maxLength = data.length / 4;

        if (textBinary.length > maxLength) {
          alert("Text is too long to encode in this image.");
          return;
        }

        for (let i = 0; i < textBinary.length; i++) {
          const index = i * 4;
          const bit = parseInt(textBinary[i]);
          data[index + 3] = bit === 0 ? 0 : 255; // Use the alpha channel to store the bit
        }

        ctx.putImageData(imageData, 0, 0);
        const encodedImage = canvas.toDataURL('image/png');
        setResultImage(encodedImage);
      };
    };
    reader.readAsDataURL(image);
  };

  const decodeTextFromImage = () => {
    if (!resultImage) {
      alert("Please encode text first.");
      return;
    }

    const img = new Image();
    img.src = resultImage;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let binaryText = '';
      for (let i = 0; i < data.length; i += 4) {
        binaryText += data[i + 3] > 0 ? '1' : '0';
      }

      let text = '';
      for (let i = 0; i < binaryText.length; i += 8) {
        const byte = binaryText.slice(i, i + 8);
        text += String.fromCharCode(parseInt(byte, 2));
      }

      setDecodedText(text);
    };
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'encoded_image.png';
    link.click();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-violet-400 " >
      <div className="container bg-gray-900 p-8 rounded-lg shadow-lg w-96 animate-fadeIn">
        <h1 className="text-center text-2xl mb-5 animate-slideDown text-white">Steganography Tool</h1>
        <form className="flex flex-col" onSubmit={(e) => { e.preventDefault(); encodeTextToImage(); }}>
          <label className="mb-4">
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 mb-4 rounded" />
          </label>
          <textarea
            className="p-2 mb-4 rounded border border-gray-700"
            placeholder="Enter text to encode"
            value={text}
            onChange={handleTextChange}
          />
          <button type="button" onClick={encodeTextToImage} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Encode Text</button>
          {resultImage && (
            <div className="mt-5">
              <h2 className="text-center text-xl mb-4">Result Image</h2>
              <img src={resultImage} alt="Encoded" className="w-full rounded shadow-lg" />
              <button type="button" onClick={downloadImage} className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Download Image</button>
              <button type="button" onClick={decodeTextFromImage} className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Decode Text</button>
            </div>
          )}
        </form>
        {decodedText && (
          <div className="mt-5 bg-gray-800 p-4 rounded shadow-md">
            <h2 className="text-center text-xl mb-4">Decoded Text</h2>
            <p className="text-center">{decodedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SteganographyAppPage;
