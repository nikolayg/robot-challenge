import { DirectionState } from "./Direction";

export class RobotState {
  private x = -1;
  private y = -1;
  private directionState: DirectionState | null = null;

  private readonly tableWidth: number;
  private readonly tableHeight: number;

  constructor(tableWidth: number, tableHeight: number) {
    this.tableWidth = tableWidth;
    this.tableHeight = tableHeight;
  }

  public getX = () => this.x;
  public getY = () => this.y;
  public getDirection = () => this.directionState?.getDirection();

  public place(newX: number, newY: number, direction: string) {
    if (!this.isOnBoard(newX, newY)) {
      throw new Error(`Invalid position: x=${newX}, y=${newY}`);
    }
    this.directionState = new DirectionState(direction);
    this.x = newX;
    this.y = newY;
  }

  public move = () => {
    if (!this.isInitialised()) {
      throw new Error(`Uninitialised - please place the robot before moving it`);
    }
    const delta = this.directionState!.computeMoveDelta();
    if (!this.isOnBoard(this.x + delta.deltaX, this.y + delta.deltaY)) {
      throw new Error(`Stop - robot's position is (${this.x}, ${this.y}) facing ${this.directionState?.getDirection()} and it would fall off`);
    }
    this.x += delta.deltaX;
    this.y += delta.deltaY;
  };

  public turn = (direction: "LEFT" | "RIGHT") => {
    if (!this.isInitialised()) {
      throw new Error(`Uninitialised - please place the robot before turning it`);
    }
    switch (direction) {
      case "LEFT":
        this.directionState!.left();
        break;
      case "RIGHT":
        this.directionState!.right();
        break;
      default:
        throw new Error(`Invalid turn direction ${this.getDirection()}`);
    }
  };

  public toString = () => {
    if (!this.isInitialised()) {
      return `Uninitialised - please place the robot before using it`;
    }
    return `${this.x},${this.y},${this.getDirection()}`;
  };

  private isOnBoard = (someX: number, someY: number) => {
    return someX >= 0 && someX < this.tableWidth && someY >= 0 && someY < this.tableHeight;
  };

  private isInitialised = () => this.isOnBoard(this.x, this.y) && !!this.directionState;
}
