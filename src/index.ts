import { RobotState } from "./model/RobotState";
import { CommandParser } from "./parser/CommandParser";
import { ConsoleIOManager } from "./parser/ConsoleIOManager";

const commandParser = new CommandParser(new ConsoleIOManager(), new RobotState(5, 5));
commandParser.start();
