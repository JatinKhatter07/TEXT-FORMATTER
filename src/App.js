import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';

const App = () => {
  const [fonts, setFonts] = useState({});

  useEffect(() => {
    fetch('/fonts.json')
      .then(response => response.json())
      .then(data => setFonts(data));
  }, []);

  return (
    <div className="App">
      <h1>Text Editor</h1>
      {Object.keys(fonts).length > 0 ? <Editor fonts={fonts} /> : <p>Loading fonts...</p>}
    </div>
  );
};

export default App;

