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

  describe("start", () => {
    test("reads command and processes them one by one", async () => {
      const io: IOManager = {
        promptForLine: jest
          .fn()
          .mockReturnValueOnce(Promise.resolve("line 1"))
          .mockReturnValueOnce(Promise.resolve("line 2"))
          .mockReturnValueOnce(Promise.resolve("line 3")),
        writeLine: jest.fn(_i => Promise.resolve("")),
        close: jest.fn(() => Promise.resolve(""))
      };
      const robotState = {
        place: jest.fn(_i => null),
        move: jest.fn(() => null),
        turn: jest.fn(_i => null),
        toString: jest.fn(() => null)
      };

      const commandParser = new CommandParser(io, robotState as any);

      // Mock processCommand - we're only testing "start"
      commandParser.processCommand = jest
        .fn()
        .mockReturnValueOnce(Promise.resolve(false))
        .mockReturnValueOnce(Promise.resolve(false))
        .mockReturnValueOnce(Promise.resolve(true));

      await commandParser.start();

      expect(io.writeLine).toHaveBeenCalled();
      expect(io.promptForLine).toHaveBeenCalledTimes(3);
      expect(commandParser.processCommand).toHaveBeenCalledTimes(3);
      expect(commandParser.processCommand).toHaveBeenCalledWith("line 1");
      expect(commandParser.processCommand).toHaveBeenCalledWith("line 2");
      expect(commandParser.processCommand).toHaveBeenCalledWith("line 3");
      expect(io.close).toHaveBeenCalledTimes(1);
    });
  });
});
