import React, { useState, useEffect } from "react";
import EmptyIcon from "../Image/empty-folder.png";
const FoldersComponent = () => {
  const [previousFolders, setPreviousFolders] = useState([]);
  const [newFolders, setNewFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch(
          "https://server-2h82.onrender.com/api/folder"
        );
        const data = await response.json();
        const folderdata = await data.folders;
        const previousFolders = folderdata.map((folder) => ({
          name: folder.name,
          html_url: folder.html_url,
        }));
        setPreviousFolders(previousFolders);

        const githubResponse = await fetch(
          "https://api.github.com/repos/thinkswell/javascript-mini-projects/contents"
        );
        const githubData = await githubResponse.json();
        const latestFolders = githubData.filter(
          (item) => item.type === "dir" && !item.name.startsWith(".github")
        );
        const newFolders = latestFolders.filter(
          (folder) =>
            !previousFolders.some(
              (prevFolder) => prevFolder.name === folder.name
            )
        );
        console.log(newFolders);
        setNewFolders(newFolders);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFolders();
  }, []);

  const handleCardClick = (folder) => {
    setSelectedFolder(folder);
    setFolderName(folder.name);
    setFolderDescription(folder.description || "");
  };

  const handleFormSubmit = async (e) => {
    console.log(folderName);
    console.log("heelo" + folderDescription);
    e.preventDefault();
    try {
      const response = await fetch(
        "https://server-2h82.onrender.com/api/addfolder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: folderName,
            description: folderDescription,
          }),
        }
      );
      const data = await response.json();
      console.log("Folder added:", data);
      // Reset form and selected folder
      setFolderName("");
      setFolderDescription("");
      setSelectedFolder(null);
      fetchFolders();
    } catch (error) {
      console.error("Error adding folder:", error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold text-gray-900 dark:text-white text-center pb-5">
        New Folders
      </h1>
      {newFolders.length === 0 ? (
        <div>
          <p className="tracking-tighter text-gray-500 md:text-lg dark:text-gray-400 text-center">
            No new folders found.
          </p>

          <img
            class="h-auto max-w-lg mx-auto"
            src={EmptyIcon}
            alt="image description"
          />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {newFolders.map((folder) => (
            <div
              key={folder.name}
              className="bg-white border border-bright rounded p-4 cursor-pointer text-center m-5"
              onClick={() => handleCardClick(folder)}
            >
              <a href={folder.html_url} className="text-bright font-bold">
                {folder.name}
              </a>
            </div>
          ))}
        </div>
      )}

      {selectedFolder && (
        <div className="mt-4">
          <h2 className="text-4xl text-gray-900 dark:text-white text-center pb-5">
            Add Folder
          </h2>
          <form
            className="flex flex-col items-center bg-gray-800  gap-5"
            onSubmit={handleFormSubmit}
          >
            <div>
              <label className="block mb-2 font-bold text-white text-left">
                Name:
              </label>
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="border border-gray-400 px-2 py-1 rounded "
                required
              />
            </div>
            <div className="mt-2">
              <label className="block mb-2 font-bold text-white">
                Description:
              </label>
              <textarea
                value={folderDescription}
                onChange={(e) => setFolderDescription(e.target.value)}
                className="border border-gray-400 px-2 py-1 rounded"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Add
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FoldersComponent;
