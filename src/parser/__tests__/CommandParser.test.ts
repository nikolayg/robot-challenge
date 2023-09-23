import { CommandParser } from "../CommandParser";
import { IOManager } from "../IOManager";

describe("CommandParser", () => {
  describe("processCommand", () => {
    test("dispatches commands", async () => {
      const io: IOManager = {
        promptForLine: jest.fn(_i => Promise.resolve("")),
        writeLine: jest.fn(_i => Promise.resolve("")),
        close: jest.fn(() => Promise.resolve(""))
      };
      const robotState = {
        place: jest.fn(_i => null),
        move: jest.fn(() => null),
        turn: jest.fn(_i => null),
        toString: jest.fn(() => null)
      };
      // PLACE
      const commandParser = new CommandParser(io, robotState as any);
      expect(await commandParser.processCommand("PLACE 0 0 NORTH")).toBeFalsy();
      expect(robotState.place).toHaveBeenCalledWith(0, 0, "NORTH");

      // REPORT
      expect(await commandParser.processCommand("REPORT")).toBeFalsy();
      expect(io.writeLine).toHaveBeenCalled();
      expect(robotState.toString).toHaveBeenCalled();

      // MOVE
      expect(await commandParser.processCommand("MOVE")).toBeFalsy();
      expect(robotState.move).toHaveBeenCalled();

      // LEFT/RIGHT
      expect(await commandParser.processCommand("LEFT")).toBeFalsy();
      expect(robotState.turn).toHaveBeenCalledWith("LEFT");
      expect(await commandParser.processCommand("RIGHT")).toBeFalsy();
      expect(robotState.turn).toHaveBeenCalledWith("RIGHT");

      // QUIT/EXIT
      expect(await commandParser.processCommand("QUIT")).toBeTruthy();
      expect(io.writeLine).toHaveBeenCalledWith("Good Bye!");
      expect(await commandParser.processCommand("EXIT")).toBeTruthy();
      expect(io.writeLine).toHaveBeenCalledWith("Good Bye!");
    });
  });
});
