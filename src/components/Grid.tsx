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
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
`;



const Grid: React.FC<HooverProps> = ({ initialPosition }) => {
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [hooverPosition, setHooverPosition] = useState<Position>(initialPosition);
  const [hooverX, setHooverX] = useState(initialPosition.x);
  const [hooverY, setHooverY] = useState(initialPosition.y);
  const [hooverOrientation, setHooverOrientation] = useState(initialPosition.orientation);

  useEffect(() => {
    const newPosition: Position = {
      x: hooverX,
      y: hooverY,
      orientation: hooverOrientation,
    };

    const hoover = new Hoover(newPosition);
    const finalPosition = hoover.executeInstructions(instructions);
    setHooverPosition({ ...finalPosition });
  }, [hooverX, hooverY, hooverOrientation, instructions]);

  const handleInstructionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputInstructions = event.target.value.split('') as Instruction[];
    setInstructions(inputInstructions);
  };

  const handleHooverXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newX = Number(event.target.value);
    setHooverX(newX);
  };

  const handleHooverYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newY = Number(event.target.value);
    setHooverY(newY);
  };

  const handleHooverOrientationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrientation = event.target.value as Orientation;
    setHooverOrientation(newOrientation);
  };

  return (
    <Container>

      <FormField>
        <Label>X:</Label>
        <Input type="number" value={hooverX} onChange={handleHooverXChange} />
      </FormField>
      <FormField>
        <Label>Y:</Label>
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
