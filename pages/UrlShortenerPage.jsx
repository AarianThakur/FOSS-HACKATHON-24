import React, { useState } from 'react';
// Ensure to import your tailwind-generated CSS

const UrlShortenerPage = () => {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState('');

    const shortenURL = async () => {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        if (response.ok) {
            const data = await response.text();
            setResult(`shortened URL: <a href="${data}" target="_blank">${data}</a>`);
        } else {
            setResult("Error Shortening URL");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-tl from-[#8585ff] to-[#ff7878fd] p-5">
            <div className="bg-gradient-to-tr from-[#ff3636fd] to-[#6868ff] p-6 rounded-lg border-2 border-blue-500 text-white">
                <h1 className="text-2xl mb-4">URL Shortener</h1>
                <label htmlFor="url" className="block mb-2">Enter URL to Shorten:</label>
                <input 
                    type="text" 
                    id="url" 
                    className="w-full p-2 mb-4 border border-gray-300 rounded text-black" 
                    placeholder="https://www.example.com/long-url" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                />
                <button 
                    onClick={shortenURL} 
                    className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
                >
                    Shorten
                </button>
                <div id="result" className="mt-4" dangerouslySetInnerHTML={{ __html: result }}></div>
            </div>
        </div>
    );
};

export default UrlShortenerPage;

