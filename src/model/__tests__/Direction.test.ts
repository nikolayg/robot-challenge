import { DirectionState } from "../Direction";

describe("DirectionState", () => {
  describe("constructor", () => {
    test("Valid direction", () => {
      const directionState = new DirectionState("NORTH");
      expect(directionState.getDirection()).toEqual("NORTH");
    });

    test("Invalid direction", () => {
      expect(() => new DirectionState("error")).toThrow(`Invalid direction "error"`);
    });
  });

  describe("left", () => {
    test("Moves all directions to the left", () => {
      const directionState = new DirectionState("NORTH");
      expect(directionState.left().getDirection()).toEqual("WEST");
      expect(directionState.left().getDirection()).toEqual("SOUTH");
      expect(directionState.left().getDirection()).toEqual("EAST");
      expect(directionState.left().getDirection()).toEqual("NORTH");
    });
  });

  describe("right", () => {
    test("Moves all directions to the right", () => {
      const directionState = new DirectionState("NORTH");
      expect(directionState.right().getDirection()).toEqual("EAST");
      expect(directionState.right().getDirection()).toEqual("SOUTH");
      expect(directionState.right().getDirection()).toEqual("WEST");
      expect(directionState.right().getDirection()).toEqual("NORTH");
    });
  });

  describe("computeMoveDelta", () => {
    test("computes deltas for all directions", () => {
      expect(new DirectionState("NORTH").computeMoveDelta()).toEqual(
        expect.objectContaining({
          deltaX: 0,
          deltaY: 1
        })
      );
      expect(new DirectionState("SOUTH").computeMoveDelta()).toEqual(
        expect.objectContaining({
          deltaX: 0,
          deltaY: -1
        })
      );
      expect(new DirectionState("EAST").computeMoveDelta()).toEqual(
        expect.objectContaining({
          deltaX: 1,
          deltaY: 0
        })
      );
      expect(new DirectionState("WEST").computeMoveDelta()).toEqual(
        expect.objectContaining({
          deltaX: -1,
          deltaY: 0
        })
      );
    });
  });
});
