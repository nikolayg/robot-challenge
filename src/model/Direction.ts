export enum Direction {
  NORTH = "NORTH",
  EAST = "EAST",
  SOUTH = "SOUTH",
  WEST = "WEST"
}

const orderedDirections = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST];

export class DirectionState {
  private direction: Direction;

  constructor(directionName: string) {
    this.direction = DirectionState.parseDirection(directionName);
  }

  public getDirection = () => this.direction;

  private static parseDirection = (direction: string) => {
    const match = orderedDirections.find(e => direction && e.toLowerCase() === direction.toLowerCase().trim());
    if (!match) {
      throw new Error(`Invalid direction "${direction}"`);
    }
    return match;
  };

  /**
   * Rotates the direction at i*90 degrees clockwise.
   */
  private rotate90 = (i: number) => {
    const currentDirectionIndex = orderedDirections.indexOf(this.direction);
    const n = orderedDirections.length;

    // Compute the index of the next direction
    const newDirectionIndex = (n + currentDirectionIndex + (i % n)) % n;

    // Set the new direction
    this.direction = orderedDirections[newDirectionIndex];
    return this;
  };

  public left = () => this.rotate90(-1);
  public right = () => this.rotate90(1);

  public computeMoveDelta = () => {
    let deltaX = 0;
    let deltaY = 0;
    switch (this.direction) {
      case Direction.NORTH:
        deltaY++;
        break;
      case Direction.WEST:
        deltaX--;
        break;
      case Direction.SOUTH:
        deltaY--;
        break;
      case Direction.EAST:
        deltaX++;
        break;
    }
    return { deltaX, deltaY };
  };
}
