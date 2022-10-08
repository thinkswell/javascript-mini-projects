let data = [
    {
        shortcut: "Ctrl+Shift+P/F1",
        description: "Show Command Palette"
    },
    {
        shortcut : "Ctrl+P",
        description: "Quick Open"
    },
    {
        shortcut : "Ctrl+Shift+N",
        description: "New window/instance"
    },
    {
        shortcut : "Ctrl+Shift+W",
        description: "Close window/instance"
    },
    {
        shortcut : "Ctrl+X",
        description: "Cut line (empty selection)"
    },
    {
        shortcut : "Ctrl+C",
        description: "Copy line (empty selection)"
    },
    {
        shortcut : "Alt+Up Arrow/Down Arrow",
        description: "Move line up/down"
    },
    {
        shortcut : "Shift+Alt+Down Arrow/Up Arrow",
        description: "Copy line up/down"
    },
    {
        shortcut : "Ctrl+Shift+K",
        description: "Delete line"
    },
    {
        shortcut : "Ctrl+Enter",
        description: "Insert line below"
    },
    {
        shortcut : "Ctrl+Shift+Enter",
        description: "Insert line above"
    },
    {
        shortcut : " Ctrl+Shift+\ ",
        description: "Jump to matching bracket"
    },
    {
        shortcut : "Ctrl+]/[",
        description: "Indent/outdent line"
    },
    {
        shortcut : "Home",
        description: "Go to beginning of line"
    },
    {
        shortcut : "End",
        description: "Go to End of line"
    },
    {
        shortcut : "Ctrl+Home",
        description: "Go to beginning of file"
    },
    {
        shortcut : "Ctrl+End",
        description: "Go to End of file"
    },
    {
        shortcut : "Ctrl+Up Arrow/Down Arrow",
        description: "Scroll line up/down"
    },
    {
        shortcut : "Alt+PgUp/PgDn",
        description: "Scroll page up/down"
    },
    {
        shortcut : "Ctrl+Shift+[",
        description: "Fold (collapse) region"
    },
    {
        shortcut : "Ctrl+Shift+]",
        description: "Unfold (uncollapse) region"
    },
    {
        shortcut : "Ctrl+K, then Ctrl+[",
        description: "Fold (collapse) all subregions"
    },
    {
        shortcut : "Ctrl+K, then Ctrl+]",
        description: "Unfold (uncollapse) all subregions"
    },
    {
        shortcut : "Ctrl+K, then Ctrl+0",
        description: "Fold (collapse) all regions"
    },
    {
        shortcut : "Ctrl+K, then Ctrl+J",
        description: "Unfold (uncollapse) all regions"
    },
    {
        shortcut : "Ctrl+K, then Ctrl+C",
        description: "Add line comment"
    },
    {
        shortcut : "Ctrl+K, then Ctrl+U",
        description: "Remove line comment"
    },
    {
        shortcut : "Ctrl+/",
        description: "Toggle line comment"
    },
    {
        shortcut : "Shift+Alt+A",
        description: "Toggle block comment"
    },
    {
        shortcut : "Alt+Z",
        description: "Toggle word wrap"
    },
    {
        shortcut : "Ctrl+T",
        description: "Show all Symbols"
    },
    {
        shortcut : "Ctrl+G",
        description: "Go to Line..."
    },
    {
        shortcut : "Ctrl+P",
        description: "Go to File..."
    },
    {
        shortcut : "Ctrl+Shift+O",
        description: "Go to Symbol..."
    },
    {
        shortcut : "Ctrl+Shift+M",
        description: "Show Problems panel"
    },
    {
        shortcut : "F8",
        description: "Go to next error or warning"
    },
    {
        shortcut : "Shift+F8",
        description: "Go to previous error or warning"
    },
    {
        shortcut : "Ctrl+Shift+Tab",
        description: "Navigate editor group history"
    },
    {
        shortcut : "Alt+Left Arrow/Right Arrow",
        description: "Go back / forward"
    },
    {
        shortcut : "Ctrl+M",
        description: "Toggle Tab moves focus"
    },
    {
        shortcut : "Ctrl+F",
        description: "Find"
    },
    {
        shortcut : "Ctrl+H",
        description: "Replace"
    },
    {
        shortcut : "F3/Shift+F3",
        description: "Find next/previous"
    },
    {
        shortcut : "Alt+Enter",
        description: "Select all occurences of Find match"
    },
    {
        shortcut : "Ctrl+D",
        description: "Add selection to next Find match"
    },
    {
        shortcut : "Ctrl+K, then Ctrl+D",
        description: "Move last selection to next Find match"
    },
    {
        shortcut : "Alt+C/R/W",
        description: "Toggle Case-sensitive/Regex/Whole word"
    },
    {
        shortcut : "Alt+Click",
        description: "Insert cursor"
    },
    {
        shortcut : "Ctrl+Alt+Up Arrow/Down Arrow",
        description: "Insert cursor above / below"
    },
    {
        shortcut : "Ctrl+U",
        description: "Undo last cursor operation"
    },
    {
        shortcut : "Shift+Alt+I",
        description: "Insert cursor at end of each line selected"
    },
    {
        shortcut : "Ctrl+I",
        description: "Select current line"
    },
    {
        shortcut : "Ctrl+Shift+L",
        description: "Select all occurrences of current selection"
    },
    {
        shortcut : "Ctrl+F2",
        description: "Select all occurrences of current word"
    },
    {
        shortcut : "Shift+Alt+Right Arrow",
        description: "Expand selection"
    },
    {
        shortcut : "Shift+Alt+Left Arrow",
        description: "Shrink selection"
    },
    {
        shortcut : "Shift+Alt +Drag",
        description: "Column (box) selection"
    },
    {
        shortcut : "Ctrl+Shift+Alt+Arrow Keys",
        description: "Column (box) selection"
    },
    {
        shortcut : "Ctrl+Shift+Alt+PgUp /PgDn",
        description: "Column (box) selection page up/down"
    },
    {
        shortcut : "Ctrl+Spacebar",
        description: "Trigger suggestion"
    },
    {
        shortcut : "Ctrl+Shift+Spacebar",
        description: "Trigger parameter hints"
    },
    {
        shortcut : "Tab",
        description: "Emmet expand abbreviation"
    },
    {
        shortcut : "Shift+Alt+F",
        description: "Format document"
    },
    {
        shortcut : "Ctrl+K then Ctrl+F",
        description: "Format selection"
    },
    {
        shortcut : "F12",
        description: "Go to Definition"
    },
    {
        shortcut : "Alt+F12",
        description: "Peek Definition"
    },
    {
        shortcut : "Ctrl+K, then F12",
        description: "Open Definition to the side"
    },
    {
        shortcut : "Ctrl+.",
        description: "Quick Fix"
    },
    {
        shortcut : "Shift+F12",
        description: "Show References"
    },
    {
        shortcut : "F2",
        description: "Rename Symbol"
    },
    {
        shortcut : "Ctrl+Shift+./,",
        description: "Replace with next/previous value"
    },
    {
        shortcut : "Ctrl+K, then Ctrl+X",
        description: "Trim trailing whitespace"
    },
    {
        shortcut : "Ctrl+K, then M",
        description: "Change file language"
    },
    {
        shortcut : "Ctrl+F4, then Ctrl+W",
        description: "Close editor"
    },
    {
        shortcut : "Ctrl+K, then F",
        description: "Close folder"
    },
    {
        shortcut : "Ctrl+\ ",
        description: "Split editor"
    },
    {
        shortcut : "Ctrl+1/2/3",
        description: "Focus into 1st, 2nd or 3rd editor group"
    },
    {
        shortcut : "Ctrl+K, then Ctrl+Left Arrow/Right Arrow",
        description: "Focus into previous/next editor group"
    },
    {
        shortcut : "Ctrl+Shift+PgUp/PgDn",
        description: "Move editor left/right"
    },
    {
        shortcut : "Ctrl+K, then Left Arrow/Right Arrow",
        description: "Move active editor group"
    },
    {
        shortcut : "Ctrl+N",
        description: "New File"
    },
    {
        shortcut : "Ctrl+O",
        description: "Open File"
    },
    {
        shortcut : "Ctrl+S",
        description: "Save"
    },
    {
        shortcut : "Ctrl+Shift+S",
        description: "Save As"
    },
    {
        shortcut : "Ctrl+F4Ctrl+K, then S",
        description: "Save All"
    },
    {
        shortcut : "Ctrl+F4",
        description: "Close"
    },
    {
        shortcut : "Ctrl+K, then Ctrl+W",
        description: "Close All"
    },
    {
        shortcut : "Ctrl+Shift+T",
        description: "Reopen closed editor"
    },
    {
        shortcut : "Ctrl+K, then Enter",
        description: "Keep Open"
    },
    {
        shortcut : "Ctrl+Tab",
        description: "Open next"
    },
    {
        shortcut : "Ctrl+Shift+Tab",
        description: "Open previous"
    },
    {
        shortcut : "Ctrl+K, then P",
        description: "Copy Path of active file"
    },
    {
        shortcut : "Ctrl+K, then R",
        description: "Reveal active file in Explorer"
    },
    {
        shortcut : "Ctrl+K, then O",
        description: "Show active file in new window/instance"
    },
    {
        shortcut : "F11",
        description: "Toggle full screen"
    },
    {
        shortcut : "Shift+Alt+1",
        description: "Toggle editor layout"
    },
    {
        shortcut : "Ctrl+=/-",
        description: "Zoom in/out"
    },
    {
        shortcut : "Ctrl+B",
        description: "Toggle Sidebar visibility"
    },
    {
        shortcut : "Ctrl+Shift+E",
        description: "Show Explorer / Toggle focus"
    },
    {
        shortcut : "Ctrl+Shift+F",
        description: "Show Search"
    },
    {
        shortcut : "Ctrl+Shift+G",
        description: "Show Git"
    },
    {
        shortcut : "Ctrl+Shift+D",
        description: "Show Debug"
    },
    {
        shortcut : "Ctrl+Shift+X",
        description: "Show Extensions"
    },
    {
        shortcut : "Ctrl+Shift+H",
        description: "Replace in files"
    },
    {
        shortcut : "Ctrl+Shift+J",
        description: "Toggle Search details"
    },
    {
        shortcut : "Ctrl+Shift+C",
        description: "Open new command prompt/terminal"
    },
    {
        shortcut : "Ctrl+Shift+U",
        description: "Show Output panel"
    },
    {
        shortcut : "Ctrl+Shift+V",
        description: "Toggle Markdown preview"
    },
    {
        shortcut : "Ctrl+K, then V",
        description: "Open Markdown preview to the side"
    },
    {
        shortcut : "F9",
        description: "Toggle breakpoint"
    },
    {
        shortcut : "F5",
        description: "Start/Continue"
    },
    {
        shortcut : "Shift+F5",
        description: "Stop"
    },
    {
        shortcut : "F11/Shift+F11",
        description: "Step into/out"
    },
    {
        shortcut : "F10",
        description: "Step over"
    },
    {
        shortcut : "Ctrl+KthenCtrl+I",
        description: "Show hover"
    },
    {
        shortcut : "Ctrl+`",
        description: "Show integrated terminal"
    },
    {
        shortcut : "Ctrl+Shift+`",
        description: "Create new terminal"
    },
    {
        shortcut : "Ctrl+Shift+C",
        description: "Copy selection"
    },
    {
        shortcut : "Ctrl+Shift+V",
        description: "Paste into active terminal"
    },
    {
        shortcut : "Ctrl+Up Arrow/Down Arrow",
        description: "Scroll up/down"
    },
    {
        shortcut : "Shift+PgUp/PgDn",
        description: "Scroll page up/down"
    },
    {
        shortcut : "Ctrl+Home/End",
        description: "Scroll to top/bottom"
    }
]


