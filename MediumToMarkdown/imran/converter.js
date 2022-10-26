const mediumToMarkdown = require("medium-to-markdown");
const path = require("path");
const fs = require("fs");

let url =
  "https://medium.com/@izaheer612/flight-price-prediction-regression-model-1fd68cefa791";

/**
 * Specify the link either in the argument
 * or
 * in the variable
 */
const args_url = process.argv.slice(2);
if (!(args_url || url)) {
  console.log("Kindly Specify the url as argument in the code!");
}
url = args_url.length != 0 ? args_url : url;
console.log(url);
let url_tokens = url.split("/");

//FILE_NAME
post_name = url_tokens[url_tokens.length - 1];
file_name = `${post_name}_${Date.now()}.md`;
file_path = path.join("./markdowns", file_name);

//CONVERTER
mediumToMarkdown.convertFromUrl(url).then(function (markdown) {
  fs.writeFile(file_path, markdown, function (err, data) {
    if (err) {
      return console.log(err);
    }
  });
});
