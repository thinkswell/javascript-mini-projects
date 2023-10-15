const express = require("express");

const JSZip = require("jszip");
const { Readable } = require("stream");

const app = express();
const port = 3000;

app.get("/api/download/:owner/:repo/:ref/:dir", async (req, res) => {
  try {
    const { owner, repo, ref, dir } = req.params;

    // Fetch the list of files in the specified directory
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${dir}?ref=${ref}`
    );
    const files = await response.json();

    // Create a new ZIP archive
    const zip = new JSZip();

    // Add each file to the ZIP archive
    for (const file of files) {
      if (file.type === "file") {
        // Fetch the file content
        const fileResponse = await fetch(file.download_url);
        const fileBuffer = await getBufferFromStream(fileResponse.body);

        // Add the file to the ZIP archive
        zip.file(`${dir}/${file.name}`, fileBuffer);
      }
    }

    // Generate the ZIP archive
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    // Create a readable stream from the ZIP buffer
    const zipStream = new Readable();
    zipStream.push(zipBuffer);
    zipStream.push(null);

    // Set the response headers for downloading the ZIP file
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename=${dir}.zip`);

    // Pipe the ZIP stream to the response
    zipStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

async function getBufferFromStream(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", (error) => reject(error));
  });
}
