const mongoose = require("mongoose");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require('body-parser');
const { jsonresponse } = require("./jsonresponse");
require('dotenv').config();

// Step 2: Extract Folder Names
const app = express();
app.use(cors());
app.use(bodyParser.json());
const folders = jsonresponse
  .filter(
    (folder) =>
      ![".github", ".gitignore", "readme.md",".yml"].includes(
        folder.name.toLowerCase()
      )
  )

// Step 3: Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Step 4: Create a Schema
const folderSchema = new mongoose.Schema(
  {
    name: String,
    description:String,
    files: [
      {
        filename: String,
     
        size: Number,
        url: String,
        type: String,
      },
    ],
    subfolders: [
      {
        name: String,
        files: [
          {
            filename: String,
            size: Number,
            url: String,
            type: String,
          },
        ],
      },
    ],
  },
  { typeKey: "$type" }
);

// Step 5: Create Model and Save Data
const Folder = mongoose.model("Folder", folderSchema);

app.get("/api/folders", async (req, res) => {
  try {
   

    const insertedFolders = await Folder.insertMany(folders);

    console.log(`${insertedFolders.length} folders saved successfully`);

    res.status(201).json({ message: "Folders saved successfully",folders: insertedFolders  });
  } catch (err) {
    console.error("Error saving folders:", err);
    res.status(500).json({ error: "Failed to save folders" });
  }
});

app.get("/api/folder", async (req, res) => {
  try {
    const allFolders = await Folder.find({});
   

    res.status(200).json({ folders: allFolders });
  } catch (err) {
    console.error("Error fetching folders:", err);
    res.status(500).json({ error: "Failed to fetch folders" });
  }
});



app.post('/api/addfolder', async (req, res) => {
  try {
    const { name, description } = req.body;
console.log(req.body);
    // Create the new folder document in the MongoDB collection
    const folder = await Folder.create({ name, description });

    console.log('Folder saved:', folder);

    res.status(201).json({ message: 'Folder saved successfully' });
  } catch (error) {
    console.error('Error saving folder:', error);
    res.status(500).json({ error: 'Failed to save folder' });
  }
});












app.get("/api/update-files/:name", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3000/api/folder");
    const dirname = req.params.name;

    // const folderNames = response.data.folders;
    // console.log("start"+response.data.folders);
    // for (const folderName of folderNames) {
    //   await processFolder(folderName);
    // }
    await processFolder(dirname);
    res.status(200).json({ message: "Folders updated successfully." });
  } catch (err) {
    console.error("Failed to update folders:", err);
    res
      .status(500)
      .json({ error: "An error occurred while updating folders." });
  }
});

async function processFolder(folderName) {
  const folder = await Folder.findOne({ name: folderName });

  if (!folder) {
    console.log(`Folder not found: ${folderName}`);
    return;
  }

  const folderUrl = `https://api.github.com/repos/avinashkranjan/Pentesting-and-Hacking-Scripts/contents/${folderName}`;

  const response = await axios.get(folderUrl);

  let items = response.data;

  if (Array.isArray(items)) {
    console.log("items is an array");
  } else {
    items = [items];
    console.log("items is not an array");
  }

  const filer = items.filter((item) => item.type === "file");

  const fileObjects = filer.map((file) => ({
    filename: file.name,
    size: file.size,
    url: file.download_url,
    type: file.type,
  }));
  folder.files = fileObjects;

  const out = await Folder.findOneAndUpdate(
    { name: folder.name },
    { $set: { files: fileObjects } },
    { new: true, runValidators: true }
  );

  console.log(`Folder updated: ${folderName}`);

  for (const item of items) {
    if (item.type === "dir") {
      await processSubfolder(2, folder, item.name);
    }
  }
}

async function processSubfolder(count, parentFolder, subfolderName) {
  var mycount = count;
  mycount = mycount - 1;
  console.log("parentFolder" + parentFolder.name);
  console.log("subFolderName" + subfolderName);
  if (mycount == 1) {
    console.log("why are you here");
    var subfolderUrl = `https://api.github.com/repos/avinashkranjan/Pentesting-and-Hacking-Scripts/contents/${parentFolder.name}/${subfolderName}`;
  } else {
    console.log("why are you here go there");
    var subfolderUrl = `https://api.github.com/repos/avinashkranjan/Pentesting-and-Hacking-Scripts/contents/DDoS-Ripper/${parentFolder.name}/${subfolderName}`;
    console.log(subfolderUrl);
  }

  const response = await axios.get(subfolderUrl);
  const items = response.data;

  const files = items.filter((item) => item.type === "file");

  const fileObjects = files.map((file) => ({
    filename: file.name,
    size: file.size,
    url: `${subfolderUrl}/${file.name}`, // Append subfolder name to the URL
    type: file.type,
  }));

  const subfolder = {
    name: subfolderName,
    files: fileObjects,
    subfolders: [],
  };

  parentFolder.subfolders.push(subfolder);
  console.log(parentFolder.subfolders);
  const subfolderNameToFind = "DDoS-Ripper Pro";
  const foundSubfolderIndex = parentFolder.subfolders.findIndex(
    (subfolder) => subfolder.name === subfolderNameToFind
  );

  if (count == 1) {
    await parentFolder.save();
  }

  console.log(`Subfolder updated: ${subfolderName}`);
  if (subfolderName == "pytransform") {
  }
  console.log("Parent", parentFolder.name);
  for (const item of items) {
    console.log(item.name);
    if (item.type === "dir") {
      if (item.type === "dir") {
        console.log("special" + subfolder.name);
        await processSubfolder(3, subfolder, item.name);
      }
      console.log("Subfolder", subfolder.name);

      await processSubfolder(2, subfolder, item.name);
    }
  }

  // Introduce a delay of 1 second (1000 milliseconds) after each subfolder processing
  await delay(1000);
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.get("/api/getfiles/:name", async (req, res) => {
  try {
    const dirname = req.params.name;
    // Retrieve the folder document from the database
    const folder = await Folder.findOne({ name: dirname });

    console.log(folder);
    // Extract the file and subfolder URLs from the folder document
    const files = folder.files.map((file) => file.url);
    const subfolders = folder.subfolders.map((subfolder) => ({
      name: subfolder.name,
      files: subfolder.files.map((file) => file.url),
    }));
    const name = folder.name;
    // Create a response object with the URLs
    const response = {
      name,
      files,
      subfolders,
    };

    // Send the response as JSON
    res.json(response);
  } catch (error) {
    // Handle any error that occurs during the database query or processing
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.get("/api/getfiles/:name", async (req, res) => {
  try {
    const dirname = req.params.name;
    // Retrieve the folder document from the database
    const folder = await Folder.findOne({ name: dirname });

    console.log(folder);
    // Extract the file and subfolder URLs from the folder document
    const files = folder.files.map((file) => file.url);
    const subfolders = folder.subfolders.map((subfolder) => ({
      name: subfolder.name,
      files: subfolder.files.map((file) => file.url),
    }));
    const name = folder.name;
    // Create a response object with the URLs
    const response = {
      name,
      files,
      subfolders,
    };

    // Send the response as JSON
    res.json(response);
  } catch (error) {
    // Handle any error that occurs during the database query or processing
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("server is listening on port 3000....");
});
