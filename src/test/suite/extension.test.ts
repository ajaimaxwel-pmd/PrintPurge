import * as vscode from './../__mocks__/vscode';
import { replaceTextInEditor, removalPatterns } from './../../extension';

describe('replaceTextInEditor', () => {
	let mockEditBuilder: any;
	let mockDocument: any;
	let mockEditor: any;
	let mockRange: any;

	beforeEach(() => {
		jest.mock('vscode');

		mockEditBuilder = { replace: jest.fn() };
		mockDocument = {
			lineAt: jest.fn().mockReturnValue({ text: '' }),
			lineCount: 2,
		};
		mockEditor = {
			document: mockDocument,
			edit: jest.fn().mockImplementation((callback) => callback(mockEditBuilder)),
		};
		mockRange = {};
		(vscode.Range as jest.MockedClass<typeof vscode.Range>) = jest.fn().mockImplementation(() => mockRange) as any;
	});

	it('replaces JavaScript console.log', () => {
		mockDocument.getText = jest.fn().mockReturnValue('console.log("test");\nconsole.log("test2");');
		replaceTextInEditor(mockEditor, removalPatterns.javascript);
		expect(mockEditBuilder.replace).toHaveBeenCalledWith(mockRange, '\n');
		expect(mockEditor.edit).toHaveBeenCalled();
	});

	it('replaces C# Console.WriteLine', () => {
		mockDocument.getText = jest.fn().mockReturnValue('Console.WriteLine("test");\nConsole.WriteLine("test2");');
		replaceTextInEditor(mockEditor, removalPatterns.csharp);
		expect(mockEditBuilder.replace).toHaveBeenCalledWith(mockRange, '\n');
		expect(mockEditor.edit).toHaveBeenCalled();
	});

	it('replaces Rust println!', () => {
		mockDocument.getText = jest.fn().mockReturnValue('println!("test");\nprintln!("test2");');
		replaceTextInEditor(mockEditor, removalPatterns.rust);
		expect(mockEditBuilder.replace).toHaveBeenCalledWith(mockRange, '\n');
		expect(mockEditor.edit).toHaveBeenCalled();
	});

	it('replaces Python print', () => {
		mockDocument.getText = jest.fn().mockReturnValue('print("test")\nprint("test2")');
		replaceTextInEditor(mockEditor, removalPatterns.python);
		expect(mockEditBuilder.replace).toHaveBeenCalledWith(mockRange, '\n');
		expect(mockEditor.edit).toHaveBeenCalled();
	});

	it('replaces C++ cout', () => {
		mockDocument.getText = jest.fn().mockReturnValue('cout << "test" << endl;\ncout << "test2" << endl;');
		replaceTextInEditor(mockEditor, removalPatterns.cpp);
		expect(mockEditBuilder.replace).toHaveBeenCalledWith(mockRange, '\n');
		expect(mockEditor.edit).toHaveBeenCalled();
	});

	it('replaces Java System.out.println', () => {
		mockDocument.getText = jest.fn().mockReturnValue('System.out.println("test");\nSystem.out.println("test2");');
		replaceTextInEditor(mockEditor, removalPatterns.java);
		expect(mockEditBuilder.replace).toHaveBeenCalledWith(mockRange, '\n');
		expect(mockEditor.edit).toHaveBeenCalled();
	});

	it('replaces C printf', () => {
		mockDocument.getText = jest.fn().mockReturnValue('printf("test");\nprintf("test2");');
		replaceTextInEditor(mockEditor, removalPatterns.c);
		expect(mockEditBuilder.replace).toHaveBeenCalledWith(mockRange, '\n');
		expect(mockEditor.edit).toHaveBeenCalled();
	});

	it('replaces Swift print', () => {
		mockDocument.getText = jest.fn().mockReturnValue('print("test")\nprint("test2")');
		replaceTextInEditor(mockEditor, removalPatterns.swift);
		expect(mockEditBuilder.replace).toHaveBeenCalledWith(mockRange, '\n');
		expect(mockEditor.edit).toHaveBeenCalled();
	});

});
