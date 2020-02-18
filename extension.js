// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerCommand('extension.devDocs', function () {
        // The code you place here will be executed every time your command is executed
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        const url = 'https://devdocs.io/';
        let text = "";

        // First, selection for afine search, them, word under cursor.
        var selection = editor.selection;
        if (!selection.isEmpty) {
            text = editor.document.getText(selection);
        } else {
            const position = editor.selection.active;
            const range = editor.document.getWordRangeAtPosition(position);
            text = editor.document.getText(range);
        }

        // Safety checks
        if (text.length == 0) {
            vscode.window.showErrorMessage('Null string in text variable.');
            return;
        }
        if (text.indexOf('\n') >= 0) {
          vscode.window.showErrorMessage('Multiline selection not allowed for your security.');
          return;
        }

        // Open URI
        let uri = vscode.Uri.parse(url + "#q=" + text);
        vscode.commands.executeCommand('vscode.open', uri);
   });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
