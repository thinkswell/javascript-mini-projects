var namee = document.getElementById("name")
var address = document.getElementById("address")
var avatar = document.getElementById("avatar")


const rando = max => Math.floor(Math.random() * max + 1)
const rgb = () => ({ r: rando(255), g: rando(255), b: rando(255) })

document.body.style.backgroundColor = `rgb(${rgb().r}, ${rgb().g}, ${rgb().b})`
document.getElementById("card").style.background = `linear-gradient(to right, rgb(${rgb().r}, ${rgb().g}, ${rgb().b}), rgb(${rgb().r}, ${rgb().g}, ${rgb().b}))`

const getData = async () => {
    const resp = await fetch("https://random-data-api.com/api/v2/users")
    const respData = await resp.json()
    console.log(respData)
    namee.innerHTML = respData.first_name + " " + respData.last_name
    address.innerHTML = respData.address.street_address + ", " + respData.address.city + ", " + respData.address.state + ", " + respData.address.country
    avatar.src = respData.avatar
}


getData()


