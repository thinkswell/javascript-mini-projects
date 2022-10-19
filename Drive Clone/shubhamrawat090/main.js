(function () {
  let btnAddFolder = document.querySelector("#addFolder");
  let btnAddTextFile = document.querySelector("#addTextFile");
  let btnAddAlbum = document.querySelector("#addAlbum");
  let divBreadCrumb = document.querySelector("#breadcrumb");

  let divApp = document.querySelector("#app");
  let divAppTitleBar = document.querySelector("#app-title-bar");
  let divAppTitle = document.querySelector("#app-title");
  let divAppMenuBar = document.querySelector("#app-menu-bar");
  let divAppBody = document.querySelector("#app-body");
  let appClose = document.querySelector("#app-close");

  let aRootPath = divBreadCrumb.querySelector("a[purpose='path']");
  let divContainer = document.querySelector("#container");
  let templates = document.querySelector("#templates");
  let resources = [];
  let cfid = -1; // initially we are at root = -1
  let rid = 0; //resource id

  btnAddFolder.addEventListener("click", addFolder);
  btnAddTextFile.addEventListener("click", addTextFile);
  btnAddAlbum.addEventListener("click", addAlbum);
  aRootPath.addEventListener("click", viewFolderFromPath);
  appClose.addEventListener("click", closeApp);

  function closeApp() {
    //reset everything in app
    divAppTitle.innerHTML = "title will come here";
    divAppTitle.setAttribute("rid", "");
    divAppMenuBar.innerHTML = "";
    divAppBody.innerHTML = "";
  }

  function addFolder() {
    let rname = prompt("Enter folder's name");
    if (rname != null) rname = rname.trim();

    if (!rname) {
      // empty name validation
      alert("folder name CANNOT be empty.");
      return;
    }

    //Uniqueness Validation
    //checking if a folder with same name and having same parent id exists
    let alreadyExists = resources.some(
      (r) => r.rname == rname && r.pid == cfid
    );

    if (alreadyExists) {
      alert(rname + " is already in use. Try some other name");
      return;
    }
    let pid = cfid; //parent id
    rid++; //setting resource id as soon as addFolder() is called
    addFolderHTML(rname, rid, pid);
    resources.push({
      rid: rid,
      rname: rname,
      rtype: "folder",
      pid: cfid,
    });
    saveToStorage();
  }

  function addTextFile() {
    let rname = prompt("Enter text-file's name");
    if (rname != null) rname = rname.trim();

    if (!rname) {
      // empty name validation
      alert("text-file name CANNOT be empty.");
      return;
    }

    //Uniqueness Validation
    //checking if a text-file with same name and having same parent id exists
    let alreadyExists = resources.some(
      (r) => r.rname == rname && r.pid == cfid
    );

    if (alreadyExists) {
      alert(rname + " is already in use. Try some other name");
      return;
    }
    let pid = cfid; //parent id
    rid++; //setting resource id as soon as addTextFile() is called
    addTextFileHTML(rname, rid, pid);
    resources.push({
      rid: rid,
      rname: rname,
      rtype: "text-file",
      pid: cfid,
      isBold: true,
      isItalic: false,
      isUnderline: false,
      bgColor: "#000000",
      textColor: "#ffffff",
      fontFamily: "cursive",
      fontSize: 22,
      content: "I am a new file.",
    });
    saveToStorage();
  }

  function addAlbum() {
    let rname = prompt("Enter album's name");
    if (rname != null) rname = rname.trim();

    if (!rname) {
      // empty name validation
      alert("album name CANNOT be empty.");
      return;
    }

    //Uniqueness Validation
    //checking if a album with same name and having same parent id exists
    let alreadyExists = resources.some(
      (r) => r.rname == rname && r.pid == cfid
    );

    if (alreadyExists) {
      alert(rname + " is already in use. Try some other name");
      return;
    }
    let pid = cfid; //parent id
    rid++; //setting resource id as soon as addAlbum() is called
    addAlbumHTML(rname, rid, pid);
    resources.push({
      rid: rid,
      rname: rname,
      rtype: "album",
      pid: cfid,
    });
    saveToStorage();
  }

  function deleteFolder() {
    // delete all folders inside also
    let spanDelete = this;
    let divFolder = spanDelete.parentNode;
    let divName = divFolder.querySelector("[purpose='name']");

    let fidTBD = parseInt(divFolder.getAttribute("rid"));
    let fname = divName.innerHTML;

    let childrenExists = resources.some((r) => r.pid == fidTBD);
    let sure = confirm(
      `Are you sure you want to delete ${fname}?` +
        (childrenExists ? ". IT ALSO HAS CHILDREN!!" : "")
    ); //add message IT ALSO HAS CHILDREN!! if children for the folder exists
    if (!sure) {
      return;
    }

    //html
    divContainer.removeChild(divFolder);
    //ram
    deleteHelper(fidTBD); //deletes current folder and all its children recursively
    //storage
    saveToStorage();
  }

  function deleteHelper(fidTBD) {
    let children = resources.filter((r) => r.pid == fidTBD); //COMPARE IT WITH pid TO FIND ALL THE CHILDREN OF THIS FOLDER
    for (let i = 0; i < children.length; i++) {
      deleteHelper(children[i].rid); //this is capable of delete all the children nodes
    }

    //find idx of folder to be deleted inside resources folder based on fid To Be Deleted(fidTBD)
    let ridx = resources.findIndex((r) => r.rid == fidTBD); //COMPARE IT WITH rid TO DELETE FROM resources[]
    resources.splice(ridx, 1); //delete 1 entry from that idx
  }

  function deleteTextFile() {
    // delete all folders inside also
    let spanDelete = this;
    let divTextFile = spanDelete.parentNode;
    let divName = divTextFile.querySelector("[purpose='name']");

    let fidTBD = parseInt(divTextFile.getAttribute("rid"));
    let fname = divName.innerHTML;

    let sure = confirm(`Are you sure you want to delete ${fname}?`);
    if (!sure) {
      return;
    }

    //html
    divContainer.removeChild(divTextFile);
    //ram
    let ridx = resources.findIndex((r) => r.rid == fidTBD);
    resources.splice(ridx, 1);
    //storage
    saveToStorage();
  }

  function deleteAlbum() {
    // delete all folders inside also
    let spanDelete = this;
    let divAlbum = spanDelete.parentNode;
    let divName = divAlbum.querySelector("[purpose='name']");

    let fidTBD = parseInt(divAlbum.getAttribute("rid"));
    let fname = divName.innerHTML;

    let sure = confirm(`Are you sure you want to delete ${fname}?`);
    if (!sure) {
      return;
    }

    //html
    divContainer.removeChild(divAlbum);
    //ram
    let ridx = resources.findIndex((r) => r.rid == fidTBD);
    resources.splice(ridx, 1);
    //storage
    saveToStorage();
  }

  //validations: empty, old, unique
  function renameFolder() {
    let nrname = prompt("Enter folder's name");
    if (nrname != null) nrname = nrname.trim();

    if (!nrname) {
      // empty name validation
      alert("folder name CANNOT be empty.");
      return;
    }

    //old name validation
    let spanRename = this;
    let divFolder = spanRename.parentNode;
    let divName = divFolder.querySelector("[purpose=name]");
    let orname = divName.innerHTML;
    let ridTBU = parseInt(divFolder.getAttribute("rid"));
    if (nrname == orname) {
      alert("Please enter a new name.");
      return;
    }

    //uniqueness validation
    let alreadyExists = resources.some(
      (r) => r.rname == nrname && r.pid == cfid
    );

    if (alreadyExists) {
      alert(nrname + " already exists.");
      return;
    }

    //change HTML
    divName.innerHTML = nrname;
    //change ram
    let resource = resources.find((r) => r.rid == ridTBU);
    resource.rname = nrname;
    //change storage
    saveToStorage();
  }

  function renameTextFile() {
    let nrname = prompt("Enter file's name");
    if (nrname != null) nrname = nrname.trim();

    if (!nrname) {
      // empty name validation
      alert("file name CANNOT be empty.");
      return;
    }

    //old name validation
    let spanRename = this;
    let divTextFile = spanRename.parentNode;
    let divName = divTextFile.querySelector("[purpose=name]");
    let orname = divName.innerHTML;
    let ridTBU = parseInt(divTextFile.getAttribute("rid"));
    if (nrname == orname) {
      alert("Please enter a new name.");
      return;
    }

    //uniqueness validation
    let alreadyExists = resources.some(
      (r) => r.rname == nrname && r.pid == cfid
    );

    if (alreadyExists) {
      alert(nrname + " already exists.");
      return;
    }

    //change HTML
    divName.innerHTML = nrname;
    //change ram
    let resource = resources.find((r) => r.rid == ridTBU);
    resource.rname = nrname;
    //change storage
    saveToStorage();
  }

  function renameAlbum() {
    let nrname = prompt("Enter album's name");
    if (nrname != null) nrname = nrname.trim();

    if (!nrname) {
      // empty name validation
      alert("album name CANNOT be empty.");
      return;
    }

    //old name validation
    let spanRename = this;
    let divAlbum = spanRename.parentNode;
    let divName = divAlbum.querySelector("[purpose=name]");
    let orname = divName.innerHTML;
    let ridTBU = parseInt(divAlbum.getAttribute("rid"));
    if (nrname == orname) {
      alert("Please enter a new name.");
      return;
    }

    //uniqueness validation
    let alreadyExists = resources.some(
      (r) => r.rname == nrname && r.pid == cfid
    );

    if (alreadyExists) {
      alert(nrname + " already exists.");
      return;
    }

    //change HTML
    divName.innerHTML = nrname;
    //change ram
    let resource = resources.find((r) => r.rid == ridTBU);
    resource.rname = nrname;
    //change storage
    saveToStorage();
  }

  function viewFolder() {
    //get span view of the folder whose view button was clicked
    let spanView = this;
    //spanView's parentNode is the folder inside which the button is
    let divFolder = spanView.parentNode;
    //get the divName from the folder
    let divName = divFolder.querySelector("[purpose='name']");

    let fname = divName.innerHTML;
    let fid = parseInt(divFolder.getAttribute("rid")); //search by attribute rid that we have added in HTML

    //from templates in HTML get the one that is anchor(a) tag and hase attribute purpose='path'
    let aPathTemplate = templates.content.querySelector("a[purpose='path']");
    let aPath = document.importNode(aPathTemplate, true); //make a copy of template(like making an object of Class)

    aPath.innerHTML = fname; //add folder name to button in breadcrumb
    aPath.setAttribute("rid", fid); //change parent folder id, when clicked on the particular folder, to that folder
    aPath.addEventListener("click", viewFolderFromPath); //on clicking a particular button in breadcrumb show its content
    divBreadCrumb.appendChild(aPath); //Root->f1->f11 add like this in breadCrumb

    cfid = fid;
    divContainer.innerHTML = ""; //Empty folder icons form browser
    //display those folders that consider the clicked folder as parent
    for (let i = 0; i < resources.length; i++) {
      if (resources[i].pid == cfid) {
        if (resources[i].rtype == "folder") {
          //if we are at root then we can only see the folders/files in root and not the folders inside other folders
          addFolderHTML(resources[i].rname, resources[i].rid, resources[i].pid); //call addFolderHTML for folder with parent id as cfid
        } else if (resources[i].rtype == "text-file") {
          //for text-file type call this function
          addTextFileHTML(
            resources[i].rname,
            resources[i].rid,
            resources[i].pid
          );
        } else if (resources[i].rtype == "album") {
          //for album type call this function
          addAlbumHTML(resources[i].rname, resources[i].rid, resources[i].pid);
        }
      }
    }
  }

  function viewFolderFromPath() {
    let aPath = this;
    //get folder id of the button that was clicked
    let fid = parseInt(aPath.getAttribute("rid"));

    //set the breadcrumb
    for (let i = divBreadCrumb.children.length - 1; i >= 0; i--) {
      //stop when clicked button is reached
      if (divBreadCrumb.children[i] == aPath) break;
      //keep on deleting children from last -> first
      divBreadCrumb.removeChild(divBreadCrumb.children[i]);
    }

    //set the container
    cfid = fid;
    //remove current folders displayed
    divContainer.innerHTML = "";
    //display folders of the button which was clicked
    for (let i = 0; i < resources.length; i++) {
      if (resources[i].pid == cfid) {
        if (resources[i].rtype == "folder") {
          //if we are at root then we can only see the folders/files in root and not the folders inside other folders
          addFolderHTML(resources[i].rname, resources[i].rid, resources[i].pid); //call addFolderHTML for folder with parent id as cfid
        } else if (resources[i].rtype == "text-file") {
          //for text-file type call this function
          addTextFileHTML(
            resources[i].rname,
            resources[i].rid,
            resources[i].pid
          );
        } else if (resources[i].rtype == "album") {
          //for album type call this function
          addAlbumHTML(resources[i].rname, resources[i].rid, resources[i].pid);
        }
      }
    }
  }

  function viewTextFile() {
    let spanView = this;
    let divTextFile = spanView.parentNode;
    let divName = divTextFile.querySelector("[purpose=name]");
    let fname = divName.innerHTML;
    let fid = parseInt(divTextFile.getAttribute("rid"));

    let divNotepadMenuTemplate = templates.content.querySelector(
      "[purpose=notepad-menu]"
    );
    let divNotepadMenu = document.importNode(divNotepadMenuTemplate, true);
    divAppMenuBar.innerHTML = "";
    divAppMenuBar.appendChild(divNotepadMenu);

    let divNotepadBodyTemplate = templates.content.querySelector(
      "[purpose=notepad-body]"
    );
    let divNotepadBody = document.importNode(divNotepadBodyTemplate, true);
    divAppBody.innerHTML = "";
    divAppBody.appendChild(divNotepadBody);

    divAppTitle.innerHTML = fname;
    divAppTitle.setAttribute("rid", fid); //set resource id to retrieve it later

    //get all the buttons present in app menu bar
    let spanSave = divAppMenuBar.querySelector("[action=save]");
    let spanBold = divAppMenuBar.querySelector("[action=bold]");
    let spanItalic = divAppMenuBar.querySelector("[action=italic]");
    let spanUnderline = divAppMenuBar.querySelector("[action=underline]");
    let inputBGColor = divAppMenuBar.querySelector("[action=bg-color]");
    let inputTextColor = divAppMenuBar.querySelector("[action=fg-color]");
    let selectFontFamily = divAppMenuBar.querySelector("[action=font-family]");
    let selectFontSize = divAppMenuBar.querySelector("[action=font-size]");
    let spanDownload = divAppMenuBar.querySelector("[action=download]");
    let spanUpload = divAppMenuBar.querySelector("[action=forupload]");
    let inputUpload = divAppMenuBar.querySelector("[action=upload]");
    let textArea = divAppBody.querySelector("textArea");

    //fire events on click or change accordingly
    spanSave.addEventListener("click", saveNotepad);
    spanBold.addEventListener("click", makeNotepadBold);
    spanItalic.addEventListener("click", makeNotepadItalic);
    spanUnderline.addEventListener("click", makeNotepadUnderline);
    inputBGColor.addEventListener("change", changeNotepadBGColor);
    inputTextColor.addEventListener("change", changeNotepadTextColor);
    selectFontFamily.addEventListener("change", changeNotepadFontFamily);
    selectFontSize.addEventListener("change", changeNotepadFontSize);
    spanDownload.addEventListener("click", downloadNotepad); //upload icon
    inputUpload.addEventListener("change", uploadNotepad);
    //on clicking upload icon this input upload's click event is triggered so
    spanUpload.addEventListener("click", function () {
      inputUpload.click();
    });

    //setting initial values according to the data we have present in storage
    //if it was bold earlier then it will be bold again on clicking view as the changes were saved
    let resource = resources.find((r) => r.rid == fid);
    //if bold is pressed(true) when saving the file, then
    //1. make bold false
    //2. dispatch event will fire the makeNotepadBold() again to change it to true again
    spanBold.setAttribute("pressed", !resource.isBold);
    spanItalic.setAttribute("pressed", !resource.isItalic);
    spanUnderline.setAttribute("pressed", !resource.isUnderline);
    inputBGColor.value = resource.bgColor;
    inputTextColor.value = resource.textColor;
    selectFontFamily.value = resource.fontFamily;
    selectFontSize.value = resource.fontSize;
    textArea.value = resource.content;

    //dispatch event to presist these changes
    //dispatchEvent(new Event("click")) fires "click" event from the program itself like user has clicked mouse button
    spanBold.dispatchEvent(new Event("click"));
    spanItalic.dispatchEvent(new Event("click"));
    spanUnderline.dispatchEvent(new Event("click"));
    inputBGColor.dispatchEvent(new Event("change"));
    inputTextColor.dispatchEvent(new Event("change"));
    selectFontFamily.dispatchEvent(new Event("change"));
    selectFontSize.dispatchEvent(new Event("change"));
  }

  function viewAlbum() {
    let spanView = this;
    let divAlbum = spanView.parentNode;
    let divName = divAlbum.querySelector("[purpose=name]");
    let fname = divName.innerHTML;
    let fid = parseInt(divAlbum.getAttribute("rid"));

    let divAlbumMenuTemplate = templates.content.querySelector(
      "[purpose=album-menu]"
    );
    let divAlbumMenu = document.importNode(divAlbumMenuTemplate, true);
    divAppMenuBar.innerHTML = "";
    divAppMenuBar.appendChild(divAlbumMenu);

    let divAlbumBodyTemplate = templates.content.querySelector(
      "[purpose=album-body]"
    );
    let divAlbumBody = document.importNode(divAlbumBodyTemplate, true);
    divAppBody.innerHTML = "";
    divAppBody.appendChild(divAlbumBody);

    divAppTitle.innerHTML = fname;
    divAppTitle.setAttribute("rid", fid); //set resource id to retrieve it later

    //add picture button
    let spanAdd = divAlbumMenu.querySelector("[action=add]");
    spanAdd.addEventListener("click", addPictureToAlbum);
  }

  function addPictureToAlbum() {
    let iurl = prompt("Enter an image url");
    if (!iurl) {
      return;
    }
    let img = document.createElement("img"); //create a image tag inside picture-list
    img.setAttribute("src", iurl); //set it's src=url taken from user
    img.addEventListener("click", showPictureInMain); //on clicking the image open it in picture-view

    let divPictureList = divAppBody.querySelector(".picture-list"); //get picture-list div
    divPictureList.appendChild(img); //add picture at the end of the list
  }

  function showPictureInMain() {
    //get picture view main div which is inside app body div
    let divPictureMainImg = divAppBody.querySelector(".picture-main > img");
    //set its src = src of picture you clicked in picture-list
    divPictureMainImg.setAttribute("src", this.getAttribute("src"));

    //all images in image list is un-pressed
    let divPictureList = divAppBody.querySelector(".picture-list");
    let imgs = divPictureList.querySelectorAll("img");
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].setAttribute("pressed", false);
    }
    //our current picture is the one that is pressed
    this.setAttribute("pressed", true); //set a pressed attribute for current picture
  }

  function downloadNotepad() {
    let fid = parseInt(divAppTitle.getAttribute("rid")); //resource id to be downloaded
    let resource = resources.find((r) => r.rid == fid); //find that resource in resources folder
    let divNotepadMenu = this.parentNode;

    //convert into json format as we are downloading in json format
    let strForDownload = JSON.stringify(resource);
    //ENCODE that json string in order to handle spaces and other signs that are not allowed in URL as href contains URL
    let encodedData = encodeURIComponent(strForDownload);

    //get the anchor tag download which contains href for the file to be download
    let aDownload = divNotepadMenu.querySelector("a[purpose=download]");
    //we need to set href of anchor tag to our encoded data to download it
    aDownload.setAttribute(
      "href",
      "data:text/json; charset=utf-8, " + encodedData
    );
    //set the name of the file saved when downloaded
    aDownload.setAttribute("download", resource.rname + ".json");

    //this click event fires that anchor tag we created
    aDownload.click();
  }

  function uploadNotepad() {
    //get the file that was uploaded
    let file = window.event.target.files[0];
    //reader object is needed to read the file
    let reader = new FileReader();

    //NOTE : READ HONE SE PEHLE HUME BATANA PADTA HAI KI FILE READ HOKAR OUTPUT KAHAN DEGI(notepad app in our case), ISILIYE HUM "load" EVENT PEHLE LIKHTE HAI readAsText() KE

    //as soon as we read the file we need to fire this function, this is just ATTACHING the function NOT FIRING it
    reader.addEventListener("load", function () {
      let data = window.event.target.result; //get data from file in string form
      let resource = JSON.parse(data); // convert string to JSON object

      //get all the buttons present in app menu bar
      let spanBold = divAppMenuBar.querySelector("[action=bold]");
      let spanItalic = divAppMenuBar.querySelector("[action=italic]");
      let spanUnderline = divAppMenuBar.querySelector("[action=underline]");
      let inputBGColor = divAppMenuBar.querySelector("[action=bg-color]");
      let inputTextColor = divAppMenuBar.querySelector("[action=fg-color]");
      let selectFontFamily = divAppMenuBar.querySelector(
        "[action=font-family]"
      );
      let selectFontSize = divAppMenuBar.querySelector("[action=font-size]");
      let textArea = divAppBody.querySelector("textArea");

      //if bold is pressed(true) when saving the file, then
      //1. make bold false
      //2. dispatch event will fire the makeNotepadBold() again to change it to true again
      spanBold.setAttribute("pressed", !resource.isBold);
      spanItalic.setAttribute("pressed", !resource.isItalic);
      spanUnderline.setAttribute("pressed", !resource.isUnderline);
      inputBGColor.value = resource.bgColor;
      inputTextColor.value = resource.textColor;
      selectFontFamily.value = resource.fontFamily;
      selectFontSize.value = resource.fontSize;
      textArea.value = resource.content;

      //dispatch event to presist these changes
      //dispatchEvent(new Event("click")) fires "click" event from the program itself like user has clicked mouse button
      spanBold.dispatchEvent(new Event("click"));
      spanItalic.dispatchEvent(new Event("click"));
      spanUnderline.dispatchEvent(new Event("click"));
      inputBGColor.dispatchEvent(new Event("change"));
      inputTextColor.dispatchEvent(new Event("change"));
      selectFontFamily.dispatchEvent(new Event("change"));
      selectFontSize.dispatchEvent(new Event("change"));
    });
    //read as text file
    reader.readAsText(file);
  }

  function saveNotepad() {
    let fid = parseInt(divAppTitle.getAttribute("rid")); //get file id from divAppTitle
    let resource = resources.find((r) => r.rid == fid); // get that resource which matches the fild id

    //get following span buttons from app menu bar
    let spanBold = divAppMenuBar.querySelector("[action=bold]");
    let spanItalic = divAppMenuBar.querySelector("[action=italic]");
    let spanUnderline = divAppMenuBar.querySelector("[action=underline]");
    let inputBGColor = divAppMenuBar.querySelector("[action=bg-color]");
    let inputTextColor = divAppMenuBar.querySelector("[action=fg-color]");
    let selectFontFamily = divAppMenuBar.querySelector("[action=font-family]");
    let selectFontSize = divAppMenuBar.querySelector("[action=font-size]");
    let textArea = divAppBody.querySelector("textArea");

    //inside resources array set these properties for the resource found
    resource.isBold = spanBold.getAttribute("pressed") == "true";
    resource.isItalic = spanItalic.getAttribute("pressed") == "true";
    resource.isUnderline = spanUnderline.getAttribute("pressed") == "true";
    resource.bgColor = inputBGColor.value;
    resource.textColor = inputTextColor.value;
    resource.fontFamily = selectFontFamily.value;
    resource.fontSize = selectFontSize.value;
    resource.content = textArea.value;

    saveToStorage(); //store all these changes in storage
  }

  function makeNotepadBold() {
    let textArea = divAppBody.querySelector("textArea");
    let isPressed = this.getAttribute("pressed") == "true"; //check if button is pressed
    if (isPressed == false) {
      //if bold was earlier not pressed and then it is pressed
      this.setAttribute("pressed", true); // change to true
      textArea.style.fontWeight = "bold"; // change the font
    } else {
      //if bold was earlier pressed and then it is pressed again
      this.setAttribute("pressed", false); // change to false
      textArea.style.fontWeight = "normal"; // change the font back
    }
  }

  function makeNotepadItalic() {
    let textArea = divAppBody.querySelector("textArea");
    let isPressed = this.getAttribute("pressed") == "true";
    if (isPressed == false) {
      this.setAttribute("pressed", true);
      textArea.style.fontStyle = "italic";
    } else {
      this.setAttribute("pressed", false);
      textArea.style.fontStyle = "normal";
    }
  }

  function makeNotepadUnderline() {
    let textArea = divAppBody.querySelector("textArea");
    let isPressed = this.getAttribute("pressed") == "true";
    if (isPressed == false) {
      this.setAttribute("pressed", true);
      textArea.style.textDecoration = "underline";
    } else {
      this.setAttribute("pressed", false);
      textArea.style.textDecoration = "none";
    }
  }

  function changeNotepadBGColor() {
    let color = this.value;
    let textArea = divAppBody.querySelector("textArea");
    textArea.style.backgroundColor = color;
  }

  function changeNotepadTextColor() {
    let color = this.value;
    let textArea = divAppBody.querySelector("textArea");
    textArea.style.color = color;
  }

  function changeNotepadFontFamily() {
    let fontFamily = this.value;
    let textArea = divAppBody.querySelector("textArea");
    textArea.style.fontFamily = fontFamily;
  }

  function changeNotepadFontSize() {
    let fontSize = this.value;
    let textArea = divAppBody.querySelector("textArea");
    textArea.style.fontSize = fontSize;
  }

  function addFolderHTML(rname, rid, pid) {
    let divFolderTemplate = templates.content.querySelector(".folder");
    let divFolder = document.importNode(divFolderTemplate, true);

    let spanRename = divFolder.querySelector("[action=rename]");
    let spanDelete = divFolder.querySelector("[action=delete]");
    let spanView = divFolder.querySelector("[action=view]");
    let divName = divFolder.querySelector("[purpose=name]");

    spanRename.addEventListener("click", renameFolder);
    spanDelete.addEventListener("click", deleteFolder);
    spanView.addEventListener("click", viewFolder);
    divName.innerHTML = rname;
    divFolder.setAttribute("rid", rid);
    divFolder.setAttribute("pid", pid);

    divContainer.appendChild(divFolder);
  }

  function addTextFileHTML(rname, rid, pid) {
    let divTextFileTemplate = templates.content.querySelector(".text-file");
    let divTextFile = document.importNode(divTextFileTemplate, true);

    let spanRename = divTextFile.querySelector("[action=rename]");
    let spanDelete = divTextFile.querySelector("[action=delete]");
    let spanView = divTextFile.querySelector("[action=view]");
    let divName = divTextFile.querySelector("[purpose=name]");

    spanRename.addEventListener("click", renameTextFile);
    spanDelete.addEventListener("click", deleteTextFile);
    spanView.addEventListener("click", viewTextFile);
    divName.innerHTML = rname;
    divTextFile.setAttribute("rid", rid);
    divTextFile.setAttribute("pid", pid);

    divContainer.appendChild(divTextFile);
  }

  function addAlbumHTML(rname, rid, pid) {
    let divAlbumTemplate = templates.content.querySelector(".album");
    let divAlbum = document.importNode(divAlbumTemplate, true);

    let spanRename = divAlbum.querySelector("[action=rename]");
    let spanDelete = divAlbum.querySelector("[action=delete]");
    let spanView = divAlbum.querySelector("[action=view]");
    let divName = divAlbum.querySelector("[purpose=name]");

    spanRename.addEventListener("click", renameAlbum);
    spanDelete.addEventListener("click", deleteAlbum);
    spanView.addEventListener("click", viewAlbum);
    divName.innerHTML = rname;
    divAlbum.setAttribute("rid", rid);
    divAlbum.setAttribute("pid", pid);

    divContainer.appendChild(divAlbum);
  }

  function saveToStorage() {
    let rjson = JSON.stringify(resources); //used to convert javascript object to a json string which can be saved
    localStorage.setItem("data", rjson);
  }

  function saveToFolder() {}

  function loadFromStorage() {
    let rjson = localStorage.getItem("data"); //fetch from localstorage
    if (!rjson) {
      return;
    }

    resources = JSON.parse(rjson); //convert json string to javascript object/array of jso
    for (let i = 0; i < resources.length; i++) {
      if (resources[i].pid == cfid) {
        if (resources[i].rtype == "folder") {
          //if we are at root then we can only see the folders/files in root and not the folders inside other folders
          addFolderHTML(resources[i].rname, resources[i].rid, resources[i].pid); //call addFolderHTML for folder with parent id as cfid
        } else if (resources[i].rtype == "text-file") {
          //for text-file type call this function
          addTextFileHTML(
            resources[i].rname,
            resources[i].rid,
            resources[i].pid
          );
        } else if (resources[i].rtype == "album") {
          //for album type call this function
          addAlbumHTML(resources[i].rname, resources[i].rid, resources[i].pid);
        }
      }

      if (resources[i].rid > rid) {
        rid = resources[i].rid; //next resources should have a unique rid
      }
    }
  }

  loadFromStorage();
})();
