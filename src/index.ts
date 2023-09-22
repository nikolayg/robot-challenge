export const f = () => {
  return "test";
};

import readline from "readline/promises";

const readlineInstance = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const testPrompt = async () => {
  const name = await readlineInstance.question("Your name:\n");
  console.log(`Hi ${name}!`);
  readlineInstance.close();
  process.exit(0);
};

testPrompt();
