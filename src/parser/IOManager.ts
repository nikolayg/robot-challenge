export interface IOManager {
  promptForLine(question: string): Promise<string>;
  writeLine(line: string): Promise<any>;
  close(): Promise<any>;
}
