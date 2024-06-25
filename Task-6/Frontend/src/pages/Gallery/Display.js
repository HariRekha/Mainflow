import React from 'react';
import styled from 'styled-components';
import Gallery from './Gallery';

const MainHeading = styled.h1`
  font-size: 35px;
  color: #F5F5F5;
  text-align: center;
  margin: 2rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

function App() {
  return (
    <div className="App">
      <MainHeading>Anime Image Gallery</MainHeading>
      <Gallery />
    </div>
  );
}

export default App;
