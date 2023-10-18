import Searchbar from "../componets/Searchbar";

import HeroSec from "../componets/HeroSec";
import Card from "../componets/Card";

import FoldersComponent from "../componets/NewFolder";
import React, { useState, useEffect } from "react";

function Home() {
  //https://github.com/avinashkranjan/Pentesting-and-Hacking-Scripts/tree/master/403Bypas
  const [folders, setfolders] = useState([]);
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch(
          "https://server-2h82.onrender.com/api/folder"
        );
        const data = await response.json();
        const folderdata = await data.folders;

        setfolders(folderdata);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFolders();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const foldersWithKeys = folders.map((folder, index) => ({
    ...folder,
    key: index.toString(),
  }));

  const filteredFolders = foldersWithKeys.filter(
    (folder) =>
      folder.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !folder.name.toLowerCase().endsWith("md") &&
      !folder.name.toLowerCase().endsWith("yml") &&
      folder.name.toLowerCase() !== "license"
  );

  return (
    <div>
      <HeroSec searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="grid grid-cols-3 p-8 gap-4 justify-center ">
        {filteredFolders.map((folder, index) => (
          <Card
            key={folder.key}
            folderName={folder.name}
            description={folder.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
//
