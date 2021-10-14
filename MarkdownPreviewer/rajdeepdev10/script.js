const editor_txtarea = document.getElementById("editor");
const preview_div = document.getElementById("preview");

editor_txtarea.addEventListener("keyup", function(){
    preview_div.innerHTML = marked(editor_txtarea.value);
});

function initialMarkdown()
{
    editor_txtarea.value = `\
# Markdown Previewer
## version 0.1.0 

Enter Markdown code in the \`<textarea>\` to preview the syntax

Here's the basic source code that makes it all work:
\`\`\`
const editor_txtarea = document.getElementById("editor");
const preview_div = document.getElementById("preview");

editor_txtarea.addEventListener("keyup", function(){
    preview_div.innerHTML = marked(editor_txtarea.value);
});
\`\`\`
It uses the \`marked()\` function from the [Marked library](https://cdnjs.com/libraries/marked)

This function converts **Markdown** syntax to pure **HTML**

This project is part of **FreeCodeCamp Front End Libraries certifications** and to pass user stories I need examples of

> A block Quote

- A list item 

and an image:

![To Dare is To Do](http://blogs.ubc.ca/rajdeepdev/files/2020/12/s-l1600-1.jpg)

`;
    preview_div.innerHTML = marked(editor_txtarea.value);
}

window.onload = function(){
    initialMarkdown();
};
