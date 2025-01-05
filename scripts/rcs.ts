import fs from "node:fs";
import path from "node:path";
import * as changeCase from "change-case";
import Mustache from "mustache";

export async function create(type: string, name: string) {
  switch (type) {
    case "service": {
      const serviceName = name.toLowerCase();
      await createFile("service", serviceName, "src/services");
      break;
    }
    case "controller": {
      const controllerName = name.toLowerCase();
      await createFile("controller", controllerName, "src/controllers");
      break;
    }
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
      const renderedRoute = Mustache.render(template, { view: viewData, lowerView: viewName });
      fs.writeFileSync(`${path.join(process.cwd(), filePath)}/${viewName}.latest.ts`, renderedRoute);
      console.log(`Route file ${`${path.join(process.cwd(), filePath)}/${viewName}.latest.ts`} created successfully`);
      break;
    }
    case "controller": {
      const renderedController = Mustache.render(template, { view: viewData, lowerView: viewName });
      fs.writeFileSync(`${path.join(process.cwd(), filePath)}/${viewName}Controller.ts`, renderedController);
      console.log(
        `Controller file ${`${path.join(process.cwd(), filePath)}/${viewName}Controller.ts`} created successfully`,
      );
      break;
    }
    case "service": {
      const renderedService = Mustache.render(template, { view: viewData, lowerView: viewName });
      fs.writeFileSync(`${path.join(process.cwd(), filePath)}/${viewName}Service.ts`, renderedService);
      console.log(`Service file ${`${path.join(process.cwd(), filePath)}/${viewName}Service.ts`} created successfully`);
      break;
    }
  }
}
