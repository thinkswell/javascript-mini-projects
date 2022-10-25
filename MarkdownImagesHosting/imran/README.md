# Markdown Image Hosting

Host all your local markdown image links and use your markdown anywhere.

## Description

You can now use your markdown file directly on any blogging platform 😃 without the hustle of uploading/selecting each image manually 💻.

## Getting Started

### Dependencies

- node

### Installing

Install the app. It will install all your dependencies.

```
npm install
```

- Now make your project on firebase and get your API-keys from there.

  - Make a new firebase project https://console.firebase.google.com/

  - After creating the project click the Web icon (</>) to register your app. Proceed to the next steps and get your firebase configs from there.

  - https://firebase.google.com/docs/web/setup#register-app

- Make a `.env` file in the project root dir (`imageHosting\.env`).
- And specify the firebase API keys you got from firebase-console here in the .env file

```
# Firebase configurations in .env file
FIREBASE_API_KEY = ******************
FIREBASE_AUTH_DOMAIN = ******************
FIREBASE_PROJECT_ID = ******************
FIREBASE_STORAGE_BUCKET = ******************
FIREBASE_MESSAGING_SENDER_ID = ******************
FIREBASE_APP_ID = ******************
FIREBASE_MEASUREMENT_ID = ******************
```

Start the app and specify the markdown file in the arguments

```
npm start blog/my-blog.md
```

The parser will parse the markdown files and search for all the images links like `![my-image](./images/image1.png)`.

Please note that all the local image links should be correct. It's recommended that both the markdown file and the images should be under the same **dir\*\***

![output](./snaps/snap-output.jpg)
![output](./snaps/working.gif)

Now all the images link will be updated with the new one (hosted one).

## Help

If some error occurred try opening your markdown before hosting to check all images path are correct. Try keeping markdown and images files under the same dir and then give the markdown path to the app.

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details
