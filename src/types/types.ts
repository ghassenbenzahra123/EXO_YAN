export enum Orientation {
    North = 'N',
    East = 'E',
    West = 'W',
    South = 'S',
}
export type Instruction = 'D' | 'G' | 'A';

export interface Position {
    x: number;
    y: number;
    orientation: Orientation;
}

export interface HooverProps {
    gridWidth: number;
    gridHeight: number;
    initialPosition: Position;
}
