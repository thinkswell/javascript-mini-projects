const DownloadBtn = document.querySelector('.download')

DownloadBtn.addEventListener('click',()=>{
    let ToBeDownloadedId = IdeaTitle.innerHTML.split('.')
    ideas[ToBeDownloadedId[0]]
    let ToBeDownloaded = '\t\t'+ideas[ToBeDownloadedId[0]].title.toUpperCase() + "\n\nGenre:\n" + ideas[ToBeDownloadedId[0]].genre + "\n\nCharacters:\n" + ideas[ToBeDownloadedId[0]].characters+ '\n\nSummary:\n '+ ideas[ToBeDownloadedId[0]].summary + '\n\nScript:\n\n ' + IdeaScript.textContent
    
    const FileName = ideas[ToBeDownloadedId[0]].title.toLowerCase()+'.txt'

    const blob = new Blob([ToBeDownloaded],{type:'text/plain'})
    const url = URL.createObjectURL(blob)

    DownloadBtn.href = url
    DownloadBtn.download = FileName
})