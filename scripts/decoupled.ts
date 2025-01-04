#!/usr/bin/env node
import chalk from "chalk";
import { program } from "commander";
import figlet from "figlet";
import inquirer from "inquirer";
import ora from "ora";
import { create } from "./rcs";

const stdin = process.stdin;

console.log(chalk.yellow(figlet.textSync("Decoupled CLI", { horizontalLayout: "fitted" })));

program.exitOverride().action(() => {
  inquirer
    .prompt(
      [
        {
          type: "list",
          name: "choice",
          message: "What would you like to do?",
          choices: [
            "Create a new Router",
            "Create a new Controller",
            "Create a new Service",
            "Create new RCS set (Router, Controller and Service)",
          ],
        },
        {
          type: "input",
          name: "name",
          message: "What is the name of the entity to create?",
        },
      ],
      { input: stdin },
    )
    .then(async (result) => {
      switch (result.choice) {
        case "Create a new Router":
          await create("route", result.name);
          break;
        case "Create a new Controller":
          await create("controller", result.name);
          break;
        case "Create a new Service":
          await create("service", result.name);
          break;
        case "Create new RCS set (Router, Controller and Service)":
          await create("route", result.name);
          await create("controller", result.name);
          await create("service", result.name);
          break;
      }
      const spinner = ora(`Doing ${result.choice}\n`).start();
      spinner.succeed(chalk.green("Done!"));
    });
});

program.parse(process.argv);
