#!/usr/bin/env node
import chalk from "chalk";
import { program } from "commander";
import figlet from "figlet";
import inquirer from "inquirer";
import ora from "ora";
import db from "../src/common/utils/db";
import { create } from "./rcs";

const stdin = process.stdin;

console.log(chalk.yellow(figlet.textSync("Decoupled CLI", { horizontalLayout: "fitted" })));

async function userList() {
  const users = await db("Users");
  const emailChoices = users.map((user) => user.email);
  const emails: { email: string } = await inquirer.prompt([
    {
      type: "list",
      name: "email",
      message: "What is the email to upgrade to master?",
      choices: emailChoices,
    },
  ]);
  console.log(`Upgrading ${emails.email} to master...`);
  const role = await db("Roles").where({ name: "master" }).first();
  console.log(role);
  await db("Users").update({ role_id: role.id }).where({ email: emails.email });
  console.log(chalk.green(`${emails.email} has been upgraded to master!`));
  process.exit(0);
}

async function manageEntities() {
  const result: { name: string } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the entity to create?",
    },
  ]);

  return result;
}

async function manageUsers() {
  const { userChoice } = await inquirer.prompt([
    {
      type: "list",
      name: "userChoice",
      message: "What would you like to do in Manage Users?",
      choices: ["List all users", "Back to main menu"],
    },
  ]);

  switch (userChoice) {
    case "List all users":
      await userList();
      break;
    case "Back to main menu":
      console.log(chalk.blue("Returning to main menu..."));
      program.parse(process.argv);
      break;
  }
}

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
            "Manage Users",
          ],
        },
      ],
      { input: stdin },
    )
    .then(async (result) => {
      switch (result.choice) {
        case "Create a new Router": {
          const routeName = await manageEntities();
          await create("route", routeName.name);
          break;
        }
        case "Create a new Controller": {
          const controllerName = await manageEntities();
          await create("controller", controllerName.name);
          break;
        }
        case "Create a new Service": {
          const serviceName = await manageEntities();
          await create("service", serviceName.name);
          break;
        }
        case "Create new RCS set (Router, Controller and Service)": {
          const entityName = await manageEntities();
          await create("route", entityName.name);
          await create("controller", entityName.name);
          await create("service", entityName.name);
          break;
        }
        case "Manage Users":
          await manageUsers();
          break;
      }
      const spinner = ora(`Doing ${result.choice}\n`).start();
      spinner.succeed(chalk.green("Done!"));
    });
});

program.parse(process.argv);
