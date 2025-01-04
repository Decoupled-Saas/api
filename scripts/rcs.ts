import fs from "node:fs";
import path from "node:path";
import * as changeCase from "change-case";
import Mustache from "mustache";

export async function create(type: string, name: string) {
  switch (type) {
    case "service":
      break;
    case "controller":
      break;
    case "route": {
      const routeName = name.toLowerCase();
      await createFile("route", routeName, "src/routes");
      break;
    }
  }
  console.log(`✅ ${type} ${name} created`);
}

async function createFile(templateName: string, viewName: string, filePath: string) {
  const template = fs.readFileSync(`templates/${templateName}.mustache`).toString("utf-8");
  const viewData = changeCase.capitalCase(viewName);
  switch (templateName) {
    case "route": {
      const renderedRoute = Mustache.render(template, { view: viewName });
      fs.writeFileSync(`${path.join(process.cwd(), filePath)}/${viewName}.latest.ts`, renderedRoute);
      console.log(`Route file ${`${path.join(process.cwd(), filePath)}/${viewName}.latest.js`} created successfully`);
      break;
    }
    case "controller": {
      const renderedController = Mustache.render(template, { view: viewData, lowerView: viewName });
      fs.writeFileSync(`${path.join(process.cwd(), filePath)}/${viewName}Controller.js`, renderedController);
      console.log(
        `Controller file ${`${path.join(process.cwd(), filePath)}/${viewName}Controller.js`} created successfully`,
      );
      break;
    }
  }
}
