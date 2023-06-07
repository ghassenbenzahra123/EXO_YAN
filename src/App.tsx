import React from 'react';
import styled from 'styled-components';
import Grid from './components/Grid';
import { Position, Orientation } from './types/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f8f8f8; 
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

const App: React.FC = () => {
  const gridWidth = 10;
  const gridHeight = 10;
  const initialPosition: Position = {
    x: 5,
    y: 5,
    orientation: Orientation.North,
  };

  const handleOpenPopup = () => {
    window.open('https://calendly.com/ghassen-benzahra/30mins', '_blank');
  };

  return (
    <Container>
      <Title>iHoover</Title>
      <Grid gridWidth={gridWidth} gridHeight={gridHeight} initialPosition={initialPosition} />
      <Button onClick={handleOpenPopup}>Let's Talk! 😃</Button>
    </Container>
  );
};

export default App;
