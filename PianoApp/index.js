const WHITE_KEYS  = ['a','s','d','f','g','h','j']
const BLACK_KEYS = ['w','e','r','t','y']

const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

keys.forEach(key => {
key.addEventListener('click', ()=> play(key))
});

document.addEventListener('keydown', e => {
    if(e.repeat) return
    const key = e.key
    const whiteIndex = WHITE_KEYS.indexOf(key)
    const blackIndex = BLACK_KEYS.indexOf(key)
    
    if(whiteIndex > -1) play(whiteKeys[whiteIndex])
    if(blackIndex > -1) play(blackKeys[blackIndex])
})

function play(key){
    const note = document.getElementById(key.dataset.note)
    note.currentTime = 0
    note.play()
    key.classList.add('active')
    note.addEventListener('ended', ()=>{
        key.classList.remove('active')
    })
}