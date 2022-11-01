import chalk from "chalk";

type Message = string;

const bold = chalk.bold;
const indicator = (i: string) => bold(`[${i}]`);

const log = (msg: Message) => console.log(msg);

log.error = (msg: Message) => {
  console.error(chalk.red(chalk.bgRedBright(indicator("‼")), msg));
};

log.success = (msg: Message) => {
  console.log(chalk.greenBright(chalk.bgGreenBright(indicator("‼")), msg));
};

log.info = (msg: Message) => {
  console.info(chalk.blueBright(chalk.bgBlueBright(indicator("i")), msg));
};

export default log;
