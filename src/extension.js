const vscode = require("vscode");

function activate(context) {
  const provider = vscode.languages.registerCompletionItemProvider(
    "vexel",
    {
      provideCompletionItems(document, position, token, context) {
        const completions = [];

        const coreFunctions = [
          {
            name: "print",
            detail: "Prints a value to the console",
            insertText: "print ",
          },
          {
            name: "string_concat",
            detail: "Concatenates two strings",
            insertText: "string_concat(${1:str1}, ${2:str2})",
          },
          {
            name: "array_push",
            detail: "Pushes an element into an array",
            insertText: "array_push(${1:array}, ${2:element})",
          },
          {
            name: "array_to_string",
            detail: "Converts an array to a string",
            insertText: "array_to_string(${1:array})",
          },
          {
            name: "sleep",
            detail: "Pauses execution for the specified duration",
            insertText: "sleep(${1:duration})",
          },
          {
            name: "type_of",
            detail: "Returns the type of a given value",
            insertText: "type_of(${1:value})",
          },
          {
            name: "is_null",
            detail: "Checks if a value is null",
            insertText: "is_null(${1:value})",
          },
          {
            name: "math_add",
            detail: "Adds two numbers",
            insertText: "math_add(${1:number1}, ${2:number2})",
          },
          {
            name: "math_subtract",
            detail: "Subtracts two numbers",
            insertText: "math_subtract(${1:number1}, ${2:number2})",
          },
          {
            name: "math_multiply",
            detail: "Multiplies two numbers",
            insertText: "math_multiply(${1:number1}, ${2:number2})",
          },
          {
            name: "math_divide",
            detail: "Divides two numbers",
            insertText: "math_divide(${1:number1}, ${2:number2})",
          },
          {
            name: "math_power",
            detail: "Raises a number to a power",
            insertText: "math_power(${1:base}, ${2:exponent})",
          },
          {
            name: "math_sqrt",
            detail: "Returns the square root of a number",
            insertText: "math_sqrt(${1:number})",
          },
          {
            name: "math_abs",
            detail: "Returns the absolute value of a number",
            insertText: "math_abs(${1:number})",
          },
          {
            name: "string_length",
            detail: "Returns the length of a string",
            insertText: "string_length(${1:text})",
          },
          {
            name: "string_concat",
            detail: "Concatenates multiple strings",
            insertText: "string_concat(${1:string1}, ${2:string2}, ${3:...})",
          },
          {
            name: "string_substring",
            detail: "Extracts a substring from a string",
            insertText:
              "string_substring(${1:text}, ${2:start_index}, ${3:length})",
          },
          {
            name: "string_contains",
            detail: "Checks if a string contains a substring",
            insertText: "string_contains(${1:text}, ${2:substring})",
          },
          {
            name: "string_replace",
            detail: "Replaces occurrences of a substring",
            insertText:
              "string_replace(${1:text}, ${2:old_substring}, ${3:new_substring})",
          },
          {
            name: "string_to_upper",
            detail: "Converts a string to uppercase",
            insertText: "string_to_upper(${1:text})",
          },
          {
            name: "string_to_lower",
            detail: "Converts a string to lowercase",
            insertText: "string_to_lower(${1:text})",
          },
          {
            name: "string_trim",
            detail: "Removes leading and trailing whitespace",
            insertText: "string_trim(${1:text})",
          },
          {
            name: "string_starts_with",
            detail: "Checks if a string starts with a given prefix",
            insertText: "string_starts_with(${1:text}, ${2:prefix})",
          },
          {
            name: "string_ends_with",
            detail: "Checks if a string ends with a given suffix",
            insertText: "string_ends_with(${1:text}, ${2:suffix})",
          },
          {
            name: "array_push",
            detail: "Adds one or more elements to the end of an array",
            insertText: "array_push(${1:array}, ${2:element1}, ${3:element2})",
          },
          {
            name: "array_pop",
            detail: "Removes the last element from an array",
            insertText: "array_pop(${1:array})",
          },
          {
            name: "array_length",
            detail: "Returns the number of elements in an array",
            insertText: "array_length(${1:array})",
          },
          {
            name: "array_get",
            detail: "Retrieves an element from an array by index",
            insertText: "array_get(${1:array}, ${2:index})",
          },
          {
            name: "array_set",
            detail: "Sets an element in an array at a specific index",
            insertText: "array_set(${1:array}, ${2:index}, ${3:new_value})",
          },
          {
            name: "array_slice",
            detail: "Extracts a portion of an array",
            insertText:
              "array_slice(${1:array}, ${2:start_index}, ${3:end_index})",
          },
          {
            name: "array_join",
            detail: "Joins array elements into a string with a separator",
            insertText: "array_join(${1:array}, ${2:separator})",
          },
          {
            name: "array_to_string",
            detail: "Converts an array to a concatenated string",
            insertText: "array_to_string(${1:array})",
          },
        ];

        coreFunctions.forEach((func) => {
          const item = new vscode.CompletionItem(
            func.name,
            vscode.CompletionItemKind.Function
          );
          item.detail = func.detail;
          item.insertText = new vscode.SnippetString(func.insertText);
          completions.push(item);
        });

        const startEndKeywords = [
          {
            name: "start",
            detail: "Denotes the beginning of a block",
            insertText: "start\n\t$0\nend",
          },
          {
            name: "end",
            detail: "Denotes the end of a block",
            insertText: "end",
          },
        ];

        startEndKeywords.forEach((keyword) => {
          const item = new vscode.CompletionItem(
            keyword.name,
            vscode.CompletionItemKind.Keyword
          );
          item.detail = keyword.detail;
          item.insertText = new vscode.SnippetString(keyword.insertText);
          completions.push(item);
        });

        const variables = getVariablesFromDocument(document);
        variables.forEach((variable) => {
          const item = new vscode.CompletionItem(
            variable.name,
            vscode.CompletionItemKind.Variable
          );
          item.detail = `Variable: ${variable.name}`;
          item.insertText = new vscode.SnippetString(variable.name);
          completions.push(item);
        });

        return completions;
      },
    },
    ""
  );

  const docChangeListener = vscode.workspace.onDidChangeTextDocument(
    (event) => {
      const document = event.document;
      const changes = event.contentChanges;

      changes.forEach((change) => {
        const changeText = change.text;

        if (changeText === "start" && event.contentChanges.length === 1) {
          const position = change.range.start;

          const edit = new vscode.WorkspaceEdit();
          const nextLinePosition = new vscode.Position(position.line + 1, 0);
          edit.insert(document.uri, nextLinePosition, "end");

          const tabPosition = new vscode.Position(position.line + 1, 4);
          edit.set(document.uri, nextLinePosition, "end");

          vscode.workspace.applyEdit(edit);

          vscode.window.activeTextEditor.selection = new vscode.Selection(
            tabPosition,
            tabPosition
          );
        }
      });
    }
  );

  context.subscriptions.push(provider, docChangeListener);
}

function getVariablesFromDocument(document) {
  const variables = [];
  const text = document.getText();
  const variablePattern = /\b(set [a-zA-Z_][a-zA-Z0-9_]*)\b/g;
  let match;
  while ((match = variablePattern.exec(text)) !== null) {
    const variableName = match[1].split(" ")[1];
    if (!variables.find((varObj) => varObj.name === variableName)) {
      variables.push({ name: variableName });
    }
  }
  return variables;
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
