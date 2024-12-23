import React, { useState } from 'react';
import gifshot from 'gifshot';

const GifMaker = () => {
  const [file, setFile] = useState(null);
  const [gifUrl, setGifUrl] = useState('');
  const [gifOptions, setGifOptions] = useState({
    gifWidth: 200,
    gifHeight: 200,
    interval: 0.1,
    numFrames: 10,
    frameDuration: 1,
    fontSize: '16px',
    fontColor: '#ffffff',
    text: '',
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleGifOptionsChange = (e) => {
    const { name, value } = e.target;
    setGifOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        gifshot.createGIF(
          {
            ...gifOptions,
            images: [event.target.result],
          },
          (obj) => {
            if (!obj.error) {
              setGifUrl(obj.image);
            }
          }
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2>Gif Maker</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="video/*,image/*" onChange={handleFileChange} />
        <div>
          <label>
            Width:
            <input
              type="number"
              name="gifWidth"
              value={gifOptions.gifWidth}
              onChange={handleGifOptionsChange}
            />
          </label>
          <label>
            Height:
            <input
              type="number"
              name="gifHeight"
              value={gifOptions.gifHeight}
              onChange={handleGifOptionsChange}
            />
          </label>
          <label>
            Interval:
            <input
              type="number"
              name="interval"
              value={gifOptions.interval}
              onChange={handleGifOptionsChange}
            />
          </label>
          <label>
            Number of Frames:
            <input
              type="number"
              name="numFrames"
              value={gifOptions.numFrames}
              onChange={handleGifOptionsChange}
            />
          </label>
          <label>
            Frame Duration:
            <input
              type="number"
              name="frameDuration"
              value={gifOptions.frameDuration}
              onChange={handleGifOptionsChange}
            />
          </label>
          <label>
            Font Size:
            <input
              type="text"
              name="fontSize"
              value={gifOptions.fontSize}
              onChange={handleGifOptionsChange}
            />
          </label>
          <label>
            Font Color:
            <input
              type="color"
              name="fontColor"
              value={gifOptions.fontColor}
              onChange={handleGifOptionsChange}
            />
          </label>
          <label>
            Text:
            <input
              type="text"
              name="text"
              value={gifOptions.text}
              onChange={handleGifOptionsChange}
            />
          </label>
        </div>
        <button type="submit">Generate GIF</button>
      </form>
      {gifUrl && (
        <div>
          <h3>Generated GIF:</h3>
          <img src={gifUrl} alt="Generated GIF" />
        </div>
      )}
    </div>
  );
};

export default GifMaker;
