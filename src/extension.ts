import * as vscode from 'vscode';

export const removalPatterns: { [key: string]: RegExp } = {
	'javascript': /console\.\w+\([^;]*\);?/g,
	'typescript': /console\.\w+\([^;]*\);?/g,
	'java': /System\.out\.println\([^;]*\);?/g,
	'rust': /println!\([^;]*\);?/g,
	'python': /print\([^)]*\);?/g,
	'cpp': /cout <<[^;]*<< endl;?/g,
	'csharp': /Console\.Write(Line)?\([^;]*\);/g,
	'c': /printf\([^;]*\);/g,
	'swift': /print\([^)]*\)/g,
	'ruby': /print\s[^;]*$/g,
};

export function replaceTextInEditor(editor: vscode.TextEditor, pattern: RegExp) {
	const document = editor.document;
	const text = document.getText();
	const cleanedText = text.replace(pattern, '');

	editor.edit(editBuilder => {
		const lastLine = document.lineAt(document.lineCount - 1);
		const entireRange = new vscode.Range(0, 0, document.lineCount - 1, lastLine.text.length);
		editBuilder.replace(entireRange, cleanedText);
	});
}


export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "PrintPurge" is now active!');

	let disposable = vscode.commands.registerCommand('extension.removePrintStatements', () => {

		vscode.window.showInformationMessage('Hello World from PrintPurge!');
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			return;
		}

		const langId = editor.document.languageId;
		const pattern = removalPatterns[langId];

		if (!pattern) {
			vscode.window.showInformationMessage('This language is not supported for print statement removal.');
			return;
		}

		replaceTextInEditor(editor, pattern);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
