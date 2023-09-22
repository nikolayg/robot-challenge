import { CommandParser } from "../CommandParser";
import { IOManager } from "../IOManager";

describe("CommandParser", () => {
  describe("processCommand", () => {
    test("dispatches commands", () => {
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
      commandParser.processCommand("PLACE 0 0 NORTH");
      expect(robotState.place).toHaveBeenCalledWith(0, 0, "NORTH");

      // REPORT
      commandParser.processCommand("REPORT");
      expect(io.writeLine).toHaveBeenCalled();
      expect(robotState.toString).toHaveBeenCalled();

      // MOVE
      commandParser.processCommand("MOVE");
      expect(robotState.move).toHaveBeenCalled();

      // LEFT/RIGHT
      commandParser.processCommand("LEFT");
      expect(robotState.turn).toHaveBeenCalledWith("LEFT");
      commandParser.processCommand("RIGHT");
      expect(robotState.turn).toHaveBeenCalledWith("RIGHT");

      // QUIT/EXIT
      commandParser.processCommand("QUIT");
      expect(io.writeLine).toHaveBeenCalledWith("Good Bye!");
      commandParser.processCommand("EXIT");
      expect(io.writeLine).toHaveBeenCalledWith("Good Bye!");
    });
  });
});
