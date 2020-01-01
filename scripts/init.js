const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

const spawn = require("cross-spawn");

module.exports = function(
  appPath,
  appName,
  verbose,
  originalDirectory,
  templateName
) {
  //   const appPackage = require(path.join(appPath, "package.json"));
  //   const ownPackageName = require(path.join(__dirname, "..", "package.json"))
  //     .name;
  //   const templatePath = path.join(appPath, "node_modules", ownPackageName);
  //   const templateDir = path.join(templatePath, "template");

  //   appPackage.name = appName;

  //   fs.writeFileSync(
  //     path.join(appPath, "package.json"),
  //     JSON.stringify(appPackage, null, 2)
  //   );
  //   if (fs.existsSync(templateDir)) {
  //     fs.copySync(templateDir, appPath);
  //   }

  const ownPackageName = require(path.join(__dirname, "..", "package.json"))
    .name;
  const ownPath = path.join(appPath, "node_modules", ownPackageName);
  const appPackage = require(path.join(appPath, "package.json"));
  const templateDependencies = require(path.join(ownPath, "template.json"));

  Object.keys(templateDependencies).map(key => {
    appPackage[key] = templateDependencies[key];
  });

  fs.writeFileSync(
    path.join(appPath, "package.json"),
    JSON.stringify(appPackage, null, 2)
  );

  const templatePath = path.join(ownPath, "template");
  fs.copySync(templatePath, appPath);
};
