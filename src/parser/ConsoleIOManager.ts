import readline from "readline/promises";
import { EOL } from "os";
import { IOManager } from "./IOManager";

export class ConsoleIOManager implements IOManager {
  private readlineInstance: readline.Interface;
  constructor() {
    this.readlineInstance = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  public promptForLine = async (question: string) => {
    return await this.readlineInstance.question(`> ${question.trim()}${EOL}`);
  };
  public writeLine = (line: string) => {
    console.log(`> ${line}`);
    return Promise.resolve(null);
  };
  public close = () => {
    this.readlineInstance.close();
    return Promise.resolve(null);
  };
}
