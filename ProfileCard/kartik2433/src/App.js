import React, { useEffect, useState } from 'react';
import Profilecard from './Components/Profilecard';
// import data from './data.js';
import './App.css';

function App() {
  const data =
{
    "gender": "female",
    "name": {
        "title": "Ms",
        "first": "Tereza",
        "last": "Konovalec"
    },
    "location": {
        "street": {
            "number": 3086,
            "name": "Kurenivskiy provulok"
        },
        "city": "Pereshchepine",
        "state": "Ternopilska",
        "country": "Ukraine",
        "postcode": 71441,
        "coordinates": {
            "latitude": "78.2031",
            "longitude": "60.8987"
        },
        "timezone": {
            "offset": "+3:00",
            "description": "Baghdad, Riyadh, Moscow, St. Petersburg"
        }
    },
    "email": "tereza.konovalec@example.com",
    "login": {
        "uuid": "e6e847ac-a417-4dcf-8095-9c6452068196",
        "username": "greenmeercat795",
        "password": "malone",
        "salt": "seCYV7sa",
        "md5": "18cfd42d28bc07f70aab285f647777f3",
        "sha1": "d98af0cd7ed736be52e7a622724c56a4ded06aff",
        "sha256": "6b4061a42b855b14c1aa803c30563a67330c701b1d99747eae1b16bca73d65eb"
    },
    "dob": {
        "date": "1967-04-01T12:42:43.072Z",
        "age": 56
    },
    "registered": {
        "date": "2007-04-22T13:26:21.227Z",
        "age": 16
    }, 
    "phone": "(066) A45-0642", 
    "cell": "(068) P44-9594", 
    "id": { 
        "name": "", 
        "value": null }, 
    "picture": { 
        "large": "https://randomuser.me/api/portraits/women/33.jpg", 
        "medium": "https://randomuser.me/api/portraits/med/women/33.jpg", 
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/33.jpg" }, 
    "nat": "UA"
}

  const [Obj, setObj] = useState(data);
  const [BgColor, setBgColor] = useState();

  function loadData() {
    // console.log("loadData Called");
    const endpoint = `https://randomuser.me/api/?results=1&na=us`;
    // const endpoint = `https://randomuser.me/api/?nat=us&results=1&page=1`;
    fetch(endpoint)
      .then(response => response.json())
      .then(json => {
        console.log(json.results[0]);
        setObj(json.results[0]);
        setBgColor(BgColorGenerator());
    });
  }

  function BgColorGenerator () {
    // console.log("BgColorGenerator Called");
    let str = '0123456789abcdef'
    let color = ''
    for (let i = 0; i < 6; i++) {
        let index = Math.floor(Math.random() * str.length)
        color += str[index]
    }
    return '#' + color
  }

  function changeUser() {
    loadData();
    // console.log(BgColor);
    // console.log(Obj.picture);
  }

  useEffect(() => {
    // console.log("useEffect Hook Called");
    loadData();
    BgColorGenerator();
  },[])

  return (
    <div className="App">
        <Profilecard Obj={Obj} BgColor={BgColor}/> <br/>
        <button type="button" className="btn btn-success" onClick={changeUser}>Change User</button>
    </div>
  );
}

export default App;