import { RobotState } from "../RobotState";

describe("RobotState", () => {
  describe("place", () => {
    test("Place robot at (0,0)", () => {
      const robotState = new RobotState(5, 5);
      robotState.place(0, 0, "SOUTH");
      expect(robotState.getX()).toBe(0);
      expect(robotState.getY()).toBe(0);
      expect(robotState.getDirection()).toBe("SOUTH");
    });

    test("Place robot at upper right corner", () => {
      const robotState = new RobotState(5, 5);
      robotState.place(4, 4, "WEST");
      expect(robotState.getX()).toBe(4);
      expect(robotState.getY()).toBe(4);
      expect(robotState.getDirection()).toBe("WEST");
    });

    test("Place robot in the middle", () => {
      const robotState = new RobotState(5, 5);
      robotState.place(2, 3, "WEST");
      expect(robotState.getX()).toBe(2);
      expect(robotState.getY()).toBe(3);
      expect(robotState.getDirection()).toBe("WEST");
    });

    test("Place robot outside by X", () => {
      const robotState = new RobotState(5, 6);
      // First place it properly:
      robotState.place(0, 0, "SOUTH");

      // Now try to place outside
      expect(() => robotState.place(5, 5, "WEST")).toThrow(/Invalid position/);

      // Placement should not have been changed
      expect(robotState.getX()).toBe(0);
      expect(robotState.getY()).toBe(0);
      expect(robotState.getDirection()).toBe("SOUTH");
    });

    test("Place robot outside by Y", () => {
      const robotState = new RobotState(7, 5);
      // First place it properly:
      robotState.place(0, 0, "SOUTH");

      // Now try to place outside
      expect(() => robotState.place(6, 5, "WEST")).toThrow(/Invalid position/);

      // Placement should not have been changed
      expect(robotState.getX()).toBe(0);
      expect(robotState.getY()).toBe(0);
      expect(robotState.getDirection()).toBe("SOUTH");
    });
  });

  describe("move", () => {
    test("Move when unitialised", () => {
      const robotState = new RobotState(5, 5);
      expect(() => robotState.move()).toThrow(/Uninitialised/);
    });

    test("Move when initialised and move is valid", () => {
      const robotState = new RobotState(5, 5);
      robotState.place(0, 0, "NORTH");
      robotState.move();
      expect(robotState.getX()).toBe(0);
      expect(robotState.getY()).toBe(1);
      expect(robotState.getDirection()).toBe("NORTH");
    });

    test("Move when initialised and move is INvalid", () => {
      const robotState = new RobotState(5, 5);
      robotState.place(0, 0, "SOUTH");
      expect(() => robotState.move()).toThrow(/Stop - robot's position is/);
    });
  });

  describe("turn", () => {
    test("Turn when unitialised", () => {
      const robotState = new RobotState(5, 5);
      expect(() => robotState.turn("LEFT")).toThrow(/Uninitialised/);
    });
    test("Turn when intialised", () => {
      const robotState = new RobotState(5, 5);
      robotState.place(0, 0, "NORTH");
      robotState.turn("RIGHT");
      expect(robotState.getDirection()).toBe("EAST");
      robotState.turn("LEFT");
      expect(robotState.getDirection()).toBe("NORTH");
    });
  });

  describe("toString", () => {
    test("When unitialised", () => {
      const robotState = new RobotState(5, 5);
      expect(robotState.toString()).toMatch(/Uninitialised/);
    });
    test("Turn when intialised", () => {
      const robotState = new RobotState(5, 5);
      robotState.place(0, 0, "NORTH");
      expect(robotState.toString()).toBe("0,0,NORTH");
    });
  });
});
