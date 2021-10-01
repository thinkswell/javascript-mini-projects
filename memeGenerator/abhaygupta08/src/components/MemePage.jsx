import {useState} from "react";
const MemePage = ({ meme, SetMeme}) => {
    var passs = false;
    // console.log(meme);
    const [memeImg,setMemeImg] = useState(meme.url);
    const [memePost,setMemePost] = useState({
        template_id : meme.id,
        username : "oyetroublemaker",
        password: "-~hfvxgQ-5%ZDB6",
        boxes : []
    })
    // const ge
    return (<>
        <img src={memeImg} alt="MEME" style={{height:"70vh",border:"1px solid #1f1f1f",marginTop:"20px"}}/>
        <br></br>
        {[...Array(meme.box_count)].map((c,i) => {
            return <input key={i} type="text" placeholder={`Meme Caption ${i+1}`} data-key={`${i}`} onChange={e => {
                const newBoxes = memePost.boxes;
                newBoxes[i] = {text:e.target.value};
                setMemePost({...memePost,boxes:newBoxes});
            }}/>
        })}
        <button onClick={
            async () => {
                document.querySelectorAll("input").forEach(input => {
                    if(input.value) {passs=true;}
                })
                if(!passs) return;
                let url = `https://api.imgflip.com/caption_image?template_id=${memePost.template_id}&username=${memePost.username}&password=${memePost.password}`;
                // console.log(url)
                memePost.boxes.map( (box,i) => {
                    url += (`&boxes[${i}][text]=${box.text}`);
                })
                // console.log(url)

            fetch(url)
            .then(res => res.json())
            .then(res => setMemeImg(res.data.url))
        }
    }
        >GENERATE MEME</button>
        <button onClick= {() => {
            SetMeme(null);
        }}>CHECK OTHER TEMPLATES</button>
        </>)
}
export default MemePage;