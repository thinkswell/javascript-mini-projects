import './App.css';
import React, {useState, useEffect} from "react";
import Templates from "./components/template";
import MemePage from "./components/MemePage";

function App() {
    const [templates, setTemplates] = useState([]);
    const [meme, SetMeme] = useState(null);
    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => {
                setTemplates(data.data.memes);
            })
    }, [])


    return (
        < div className="App">
            {(meme === null) ? 
            (
            <Templates templates={templates} setMeme={SetMeme} />
            )
            :
            (
                    <MemePage meme={meme} SetMeme={SetMeme}/>
            )
            }
    </div>
    )
}
export default App;