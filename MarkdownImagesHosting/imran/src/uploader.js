import path from "path";
import fs from "fs";
import storage from "../firebaseConfig.js";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const upload = async (image_path) => {
  try {
    // READING FILE
    var newLink = "";
    // console.log(image_path, "dd===");
    var imageBuffer = fs.readFileSync(image_path);

    // CREATING UNIQUE IMAGE REF
    const timestamp = Date.now();
    const full_name = path.basename(image_path);
    const dir_name = path.basename(path.dirname(image_path));
    const type = path.extname(image_path);
    const name = path.basename(full_name, type);
    const fileName = `${dir_name}_${name}_${timestamp}.${type}`;
    const imageRef = ref(storage, fileName);

    // UPLOADING
    await uploadBytes(imageRef, imageBuffer).then((snapshot) => {
      // console.log(`Uploaded image: ${fileName}`);
    });

    // GET UPLOADED LINK
    await getDownloadURL(imageRef, fileName).then((url) => {
      newLink = url;
    });
  } catch (err) {
    console.log(err);
  }
  return newLink;
};

export default upload;
