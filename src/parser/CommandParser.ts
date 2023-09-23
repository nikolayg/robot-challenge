import { RobotState } from "../model/RobotState";
import { IOManager } from "./IOManager";

export class CommandParser {
  constructor(private io: IOManager, private robotState: RobotState) {}

  public async start() {
    await this.io.writeLine("Welcome to the Robot Simulator!");

    let finished = false;
    do {
      const command = await this.io.promptForLine("Enter command:");
      finished = await this.processCommand(command);
    } while (!finished);

    this.io.close();
  }

  /**
   * Processes the command and returns if it's terminal or not.
   * @param command - the command provided.
   * @returns if this command should terminate the application.
   */
  async processCommand(command: string) {
    try {
      const tokens = command
        .split(/\s+|,|;/)
        .map(token => token.trim())
        .filter(token => !!token);
      if (tokens.length == 0) {
        return false;
      }
      switch (tokens[0].toUpperCase()) {
        case "PLACE":
          this.robotState.place(parseInt(tokens[1]), parseInt(tokens[2]), tokens[3]);
          break;
        case "REPORT":
          await this.io.writeLine(this.robotState.toString());
          break;
        case "MOVE":
          this.robotState.move();
          break;
        case "LEFT":
        case "RIGHT":
          this.robotState.turn(tokens[0].toUpperCase() as "LEFT" | "RIGHT");
          break;
        case "EXIT":
        case "QUIT":
          await this.io.writeLine("Good Bye!");
          return true;
        default:
          await this.io.writeLine(`Unknonwn command "${tokens[0]}"`);
      }
    } catch (e: any) {
      await this.io.writeLine(e.message);
    }
    return false;
  }
}
