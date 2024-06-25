import React, { useState, useEffect } from 'react';
import './FontSelector.css';

const FontSelector = ({ fonts, selectedFont, selectedVariant, onFontChange }) => {
  const [font, setFont] = useState(selectedFont);
  const [variant, setVariant] = useState(selectedVariant);

  useEffect(() => {
    setFont(selectedFont);
    setVariant(selectedVariant);
  }, [selectedFont, selectedVariant]);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = fonts[font]?.url;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [font, fonts]);

  const handleFontChange = (e) => {
    const newFont = e.target.value;
    const newVariant = getClosestVariant(fonts[newFont].variants, variant);
    setFont(newFont);
    setVariant(newVariant);
    onFontChange(newFont, newVariant);
  };

  const handleWeightChange = (e) => {
    const newWeight = parseInt(e.target.value);
    const newVariant = { ...variant, weight: newWeight };
    if (!fonts[font].variants.includes(`${newWeight}italic`) && variant.italic) {
      newVariant.italic = false;
    }
    setVariant(newVariant);
    onFontChange(font, newVariant);
  };

  const handleItalicToggle = (e) => {
    const newVariant = { ...variant, italic: e.target.checked };
    setVariant(newVariant);
    onFontChange(font, newVariant);
  };

  const getClosestVariant = (variants, currentVariant) => {
    const weights = variants
      .filter(v => !v.includes('italic'))
      .map(v => parseInt(v))
      .sort((a, b) => Math.abs(a - currentVariant.weight) - Math.abs(b - currentVariant.weight));

    const closestWeight = weights[0];
    const italic = variants.includes(`${closestWeight}italic`);
    return { weight: closestWeight, italic };
  };

  return (
    <div className="font-selector">
      <select value={font} onChange={handleFontChange}>
        {Object.keys(fonts).map(fontName => (
          <option key={fontName} value={fontName}>{fontName}</option>
        ))}
      </select>
      <select value={variant.weight} onChange={handleWeightChange}>
        {fonts[font].variants.filter(v => !v.includes('italic')).map(weight => (
          <option key={weight} value={parseInt(weight)}>{weight}</option>
        ))}
      </select>
      <label>
        Italic
        <input
          type="checkbox"
          checked={variant.italic}
          onChange={handleItalicToggle}
          disabled={!fonts[font].variants.includes(`${variant.weight}italic`)}
        />
      </label>
    </div>
  );
};

export default FontSelector;
