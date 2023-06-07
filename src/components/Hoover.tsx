import { Position, Instruction, Orientation } from '../types/types';

class Hoover {
  private position: Position;

  constructor(position: Position) {
    this.position = position;
  }

  executeInstructions(instructions: Instruction[]): Position {
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];
      this.executeInstruction(instruction);
    }
    return this.position;
  }

  private executeInstruction(instruction: Instruction): void {
    switch (instruction) {
      case 'D':
        this.rotateRight();
        break;
      case 'G':
        this.rotateLeft();
        break;
      case 'A':
        this.moveForward();
        break;
      default:
        break;
    }
  }

  private rotateRight(): void {
    switch (this.position.orientation) {
      case Orientation.North:
        this.position.orientation = Orientation.East;
        break;
      case Orientation.East:
        this.position.orientation = Orientation.South;
        break;
      case Orientation.South:
        this.position.orientation = Orientation.West;
        break;
      case Orientation.West:
        this.position.orientation = Orientation.North;
        break;
      default:
        break;
    }
  }

  private rotateLeft(): void {
    switch (this.position.orientation) {
      case Orientation.North:
        this.position.orientation = Orientation.West;
        break;
      case Orientation.East:
        this.position.orientation = Orientation.North;
        break;
      case Orientation.South:
        this.position.orientation = Orientation.East;
        break;
      case Orientation.West:
        this.position.orientation = Orientation.South;
        break;
      default:
        break;
    }
  }

  private moveForward(): void {
    switch (this.position.orientation) {
      case Orientation.North:
        this.position.y += 1;
        break;
      case Orientation.East:
        this.position.x += 1;
        break;
      case Orientation.South:
        this.position.y -= 1;
        break;
      case Orientation.West:
        this.position.x -= 1;
        break;
      default:
        break;
    }
  }
}

export default Hoover;
