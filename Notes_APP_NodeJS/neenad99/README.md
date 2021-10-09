# Notes CLI APP
Basic Command Line App to perform CRUD operations on notes 

This repository contains code for Notes CLI App 


# Dependencies 

```
express
mongoose
dotenv
yargs
chalk
```


# Steps to configure project
* First Run  ```npm install``` to install dependencies and ```npm install -d``` to install devdependencies
* Create a .env file by filling PORT NO and type CLOUD_MONGO_URL and add your cloud mongo DB [URL](https://docs.atlas.mongodb.com/getting-started/) with your DB URL

## Commands Available!
- **``` Adding a note ```** : ``` node index.js add --title="Note1" --body="This is note1"  ```
- **``` Removing a note ```** : ``` node index.js remove --title="Note1"  ```
- **``` Listing all notes ```** : ``` node index.js list ```
- **``` Reading a note based on its title```** : ``` node index.js read --title="Note1"  ```
- **``` Updating a note```** : ``` node index.js update --title="Note1"  --body="This is note1" ```


# Screenshots

![appimage1](https://i.postimg.cc/BQvCgW3x/Screenshot-42.png)<br>
![appimage2](https://i.postimg.cc/JzvK0p9j/Screenshot-35.png)<br>
![appimage3](https://i.postimg.cc/Sspr7JQs/Screenshot-37.png)<br>
![appimage4](https://i.postimg.cc/LXBVy2hV/Screenshot-38.png)<br>
![appimage5](https://i.postimg.cc/7P9V0HFH/Screenshot-41.png)<br>
![appimage6](https://i.postimg.cc/mkmysjYz/Screenshot-40.png)<br>

