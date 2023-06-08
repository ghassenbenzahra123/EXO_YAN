import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Hoover from './Hoover';
import { HooverProps, Position, Instruction, Orientation } from '../types/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Grid: React.FC<HooverProps> = ({ initialPosition }) => {
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [hooverPosition, setHooverPosition] = useState<Position>(initialPosition);
  const [hooverX, setHooverX] = useState(initialPosition.x);
  const [hooverY, setHooverY] = useState(initialPosition.y);
  const [hooverOrientation, setHooverOrientation] = useState(initialPosition.orientation);
  const [gridSizeX, setGridSizeX] = useState(5); 
  const [gridSizeY, setGridSizeY] = useState(5); 


  useEffect(() => {
    const newPosition: Position = {
      x: hooverX,
      y: hooverY,
      orientation: hooverOrientation,
    };

    const hoover = new Hoover(newPosition);
    const finalPosition = hoover.executeInstructions(instructions);

    // Check if the final position is within the grid boundaries
    if (
      finalPosition.x >= 0 &&
      finalPosition.x <= gridSizeX &&
      finalPosition.y >= 0 &&
      finalPosition.y <= gridSizeY
    ) {
      setHooverPosition({ ...finalPosition });
    } else {
      alert('Hoover position is outside the grid boundaries!');
    }
  }, [hooverX, hooverY, hooverOrientation, instructions, gridSizeX, gridSizeY]);

  const handleInstructionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputInstructions = event.target.value.split('') as Instruction[];
    setInstructions(inputInstructions);
  };

  const handleHooverXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newX = Number(event.target.value);
    if (newX >= 0 && newX <= gridSizeX) {
      setHooverX(newX);
    } else {
      alert('Initial position is outside the grid boundaries!');
    }
  };

  const handleHooverYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newY = Number(event.target.value);
    if (newY >= 0 && newY <= gridSizeY) {
      setHooverY(newY);
    } else {
      alert('Initial position is outside the grid boundaries!');
    }
  };

  const handleHooverOrientationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrientation = event.target.value as Orientation;
    setHooverOrientation(newOrientation);
  };

  const handleGridSizeXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newXSize = Number(event.target.value);
    setGridSizeX(newXSize);

  };

  const handleGridSizeYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newYSize = Number(event.target.value);
    setGridSizeY(newYSize);

  };

  return (
    <Container>
      <FormField>
        <Label>Grid Size X:</Label>
        <Input type="number" value={gridSizeX} onChange={handleGridSizeXChange} />
      </FormField>
      <FormField>
        <Label>Grid Size Y:</Label>
        <Input type="number" value={gridSizeY} onChange={handleGridSizeYChange} />
      </FormField>
      <p><strong>Grid size:</strong> X={gridSizeX}  Y={gridSizeY}</p>
      <FormField>
        <Label>Initial Positon X:</Label>
        <Input type="number" value={hooverX} onChange={handleHooverXChange} />
      </FormField>
      <FormField>
        <Label>Initial Position Y:</Label>
        <Input type="number" value={hooverY} onChange={handleHooverYChange} />
      </FormField>
      <FormField>
        <Label>Orientation:</Label>
        <Select value={hooverOrientation} onChange={handleHooverOrientationChange}>
          <option value={Orientation.North}>North</option>
          <option value={Orientation.East}>East</option>
          <option value={Orientation.West}>West</option>
          <option value={Orientation.South}>South</option>
        </Select>
      </FormField>
      <FormField>
        <Label>Instructions:</Label>
        <Input type="text" value={instructions.join('')} onChange={handleInstructionsChange} />
      </FormField>
      <p>
        <strong>Final position:</strong> x={hooverPosition.x} y={hooverPosition.y} orientation={hooverPosition.orientation}
      </p>
    </Container>
  );
};

export default Grid;
