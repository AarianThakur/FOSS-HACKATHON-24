import React, { useState } from 'react';

function CypherTools() {
  const [encodingType, setEncodingType] = useState('ascii');
  const [operation, setOperation] = useState('encode');
  const [text, setText] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let output;
    if (encodingType === 'ascii') {
      output = operation === 'encode' ? asciiEncode(text) : asciiDecode(text);
    } else if (encodingType === 'rsa') {
      output = operation === 'encode' ? rsaEncode(text, publicKey) : rsaDecode(text, privateKey);
    }
    setResult(output);
  };

  const asciiEncode = (text) => {
    return text.split('').map(char => char.charCodeAt(0)).join(' ');
  };

  const asciiDecode = (text) => {
    return text.split(' ').map(code => String.fromCharCode(parseInt(code))).join('');
  };

  const rsaEncode = (text, publicKey) => {
    const [e, n] = publicKey.split(',').map(Number);
    return text.split('').map(char => (char.charCodeAt(0) ** e % n).toString()).join(' ');
  };

  const rsaDecode = (text, privateKey) => {
    const [d, n] = privateKey.split(',').map(Number);
    return text.split(' ').map(code => String.fromCharCode(parseInt(code) ** d % n)).join('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-700 bg-cover">
      <div className="bg-black p-6 rounded-lg shadow-lg w-80 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-4 text-center animate-slideDown">Encoding and Decoding Tool</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col mb-4">
            <label className="mb-2 text-white">
              <input type="radio" name="encodingType" value="ascii" checked={encodingType === 'ascii'} onChange={() => setEncodingType('ascii')} className="mr-2" /> ASCII
            </label>
            <label className="mb-2 text-white">
              <input type="radio" name="encodingType" value="rsa" checked={encodingType === 'rsa'} onChange={() => setEncodingType('rsa')} className="mr-2" /> RSA
            </label>
          </div>
          {encodingType === 'rsa' && (
            <div className="mb-4">
              <label htmlFor="publicKey" className="text-white">Public Key:</label>
              <input type="text" id="publicKey" placeholder="Enter public key (e,n)" value={publicKey} onChange={(e) => setPublicKey(e.target.value)} className="w-full p-2 mb-2 rounded border border-gray-300" />
              <label htmlFor="privateKey" className="text-white">Private Key:</label>
              <input type="text" id="privateKey" placeholder="Enter private key (d,n)" value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} className="w-full p-2 rounded border border-gray-300" />
            </div>
          )}
          <div className="flex flex-col mb-4">
            <label className="mb-2 text-white">
              <input type="radio" name="operation" value="encode" checked={operation === 'encode'} onChange={() => setOperation('encode')} className="mr-2" /> Encode
            </label>
            <label className="mb-2 text-white">
              <input type="radio" name="operation" value="decode" checked={operation === 'decode'} onChange={() => setOperation('decode')} className="mr-2" /> Decode
            </label>
          </div>
          <label htmlFor="text" className="text-white">Text:</label>
          <input type="text" id="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full p-2 mb-4 rounded border border-gray-300" />
          <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-300">Submit</button>
        </form>
        <div id="result" className="mt-4 p-2 bg-black border border-gray-300 rounded text-white animate-fadeIn">{result}</div>
      </div>
    </div>
  );
}

export default CypherTools;
