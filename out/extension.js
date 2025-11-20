// src/extension.ts
import * as vscode from "vscode";
import { exec } from "child_process";
var activate = (context) => {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.text = "Loading versions...";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);
  Promise.all([
    safeExec("node -v", (v) => v.replace(/^v/, "")),
    safeExec("npm -v")
  ]).then(([node, npm]) => {
    const vscodeVersion = vscode.version;
    statusBarItem.text = `VSC: ${vscodeVersion}   NODE: ${node}   NPM: ${npm}`;
  });
};
var safeExec = (command, clean) => new Promise((resolve) => {
  exec(command, (err, stdout) => {
    if (err || !stdout) resolve("not found");
    else resolve(clean ? clean(stdout.trim()) : stdout.trim());
  });
});
var deactivate = () => {
};
export {
  activate,
  deactivate
};
//# sourceMappingURL=extension.js.map
