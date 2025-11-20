import * as vscode from 'vscode'
import { exec } from 'child_process'

export const activate = (context: vscode.ExtensionContext) => {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  )
  statusBarItem.text = 'Loading versions...'
  statusBarItem.show()
  context.subscriptions.push(statusBarItem)

  Promise.all([
    safeExec('node -v', v => v.replace(/^v/, '')),
    safeExec('npm -v'),
  ]).then(([node, npm]) => {
    const vscodeVersion = vscode.version
    statusBarItem.text = `VSC: ${vscodeVersion}   NODE: ${node}   NPM: ${npm}`
  })
}

const safeExec = (
  command: string,
  clean?: (v: string) => string
): Promise<string> =>
  new Promise(resolve => {
    exec(command, (err, stdout) => {
      if (err || !stdout) resolve('not found')
      else resolve(clean ? clean(stdout.trim()) : stdout.trim())
    })
  })

export const deactivate = () => {}
