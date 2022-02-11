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
        document.getElementById("arr").style.display = "block";
        document.getElementById("arr").innerHTML = "";
        const revnum = this.reverse(number)

        nums.push(number)
        breakme: if(revnum == number){
            nums.forEach(function(element, idx , array) {
                if (idx === array.length - 1){
                    var label = "<label class='label'>"+ element +"</label>";
                }else{
                    var label = "<label class='label'>"+ element +"</label><br> <br>";
                }
                document.getElementById("arr").insertAdjacentHTML("beforeend",label);
            });
            count = 0
            nums = []
        }else{
            count++
            if(count>=10){
                document.getElementById("arr").innerHTML = "Over the Limit"
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