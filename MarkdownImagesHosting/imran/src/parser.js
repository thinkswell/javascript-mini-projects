import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import upload from "./uploader.js";

// REGEX FOR EXTRACT IMAGES PATH FROM MARKDOWN
const regex = /!\[(.*?)\]\((.*?)\)/g;

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Please specify the markdown file in args!");
  process.exit(1);
}

const file_path = args[0];

/**
 * Reading Markdown File
 */
let file_data = "";
try {
  const data = fs.readFileSync(file_path, "utf8");
  file_data = data;
} catch (err) {
  console.error(err);
}

let image_markdown;
var updated_file_data = file_data;
var hostedLink = "";

/**
 * __dirname not work in ES6
 * so defining manually
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Find all images in markdown and Upload them
 */
while ((image_markdown = regex.exec(file_data)) !== null) {
  if (image_markdown.index === regex.lastIndex) {
    regex.lastIndex++;
  }

  if (image_markdown[2].startsWith("http")) continue;
  /**
   * Upload and get link
   */
  let image_path = decodeURI(image_markdown[2]);
  console.log("Uploading 🔃: ", image_path);

  /**
   * Resolving image path.
   */
  image_path = path.resolve(
    __dirname,
    "..",
    path.dirname(file_path),
    image_path
  );

  /**
   * Uploading
   */
  hostedLink = await upload(image_path);

  /**
   * Updating image link
   */
  if (!hostedLink.startsWith("https") || !hostedLink) {
    continue;
  }

  updated_file_data = updated_file_data.replace(
    new RegExp(image_markdown[2]),
    hostedLink
  );

  /**
   * Saving file
   */
  fs.writeFileSync(file_path, updated_file_data, "utf-8");
}
