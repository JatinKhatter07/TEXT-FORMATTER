import React, { useState, useEffect } from 'react';
import FontSelector from './FontSelector';

const initialFont = 'Roboto';
const initialVariant = { weight: 400, italic: false };

const Editor = ({ fonts }) => {
  const [text, setText] = useState('');
  const [font, setFont] = useState(initialFont);
  const [variant, setVariant] = useState(initialVariant);

  useEffect(() => {
    const savedText = localStorage.getItem('text') || '';
    const savedFont = localStorage.getItem('font') || initialFont;
    const savedVariant = JSON.parse(localStorage.getItem('variant') || JSON.stringify(initialVariant));

    setText(savedText);
    setFont(savedFont);
    setVariant(savedVariant);
  }, []);

  useEffect(() => {
    localStorage.setItem('text', text);
    localStorage.setItem('font', font);
    localStorage.setItem('variant', JSON.stringify(variant));
  }, [text, font, variant]);

  const handleFontChange = (newFont, newVariant) => {
    setFont(newFont);
    setVariant(newVariant);
  };

  const fontStyle = {
    fontFamily: font,
    fontWeight: variant.weight,
    fontStyle: variant.italic ? 'italic' : 'normal',
  };

  return (
    <div>
      <FontSelector
        fonts={fonts}
        selectedFont={font}
        selectedVariant={variant}
        onFontChange={handleFontChange}
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={fontStyle}
        rows={10}
        cols={50}
      />
    </div>
  );
};

export default Editor;
