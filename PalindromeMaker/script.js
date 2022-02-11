let nums = []
let count = 0
class Palindrome{
   
    constructor(){
    }
    

    reverse(number){
        return(
            parseFloat(
                number
                .toString()
                .split('')
                .reverse()
                .join('')
            ) * Math.sign(number)
        )
    }
    



    palin(number){
        const revnum = this.reverse(number)

        nums.push(number)
        breakme: if(revnum == number){
            document.getElementById("arr").innerHTML = nums
            count = 0
            nums = []
        }else{
            count++
            if(count>=20){
                console.log("Over the Limit")
                document.getElementById("arr").innerHTML = nums
                count = 0
                nums = []
                break breakme
            }
            const temp = parseInt(revnum)+ parseInt(number)    
            this.palin(temp)
            
        }

    }



}
const btn = document.querySelector('[data-btn]')

const palindrome = new Palindrome()

btn.addEventListener('click', button =>{
    palindrome.palin(document.getElementById("txt").value)
})