/*<!-- div for writing node and delete and editing -->
    <div class="note1">
        <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main"></div>
        <textarea class="textarea"></textarea>
    </div>*/

    

//taking the reference of the add btn 
const addbtn = document.querySelector('#add');
const ntext=[];
//creating the funtion for local storage
const update_local_storage=()=>{
    //taking the reference of the data
    /*using text area coz the notetext is decleared later not before that */
    const textdata=document.querySelectorAll('textarea');

    //creating a empty array to store data in local storage
   

    textdata.forEach((note)=>{
        //evert data is working like a array
        //so here we are getting the value of the text area then 
        //we are pushing this to the array
        return ntext.push(note.value);
        //to get the inner text use value
    });

    // console.log(ntext);

    /*now we will use local storage to stored data for
    two ite are there 1.getitem()--to get ant data
                       2.setitem() to set any data into sorage
        two arguments 1st array name then a string so we will 
        use jason methode here to stingfy the array*/
    localStorage.setItem('ntext',JSON.stringify(ntext));

}

 
//making the addNewnote function
//here we have to create everything means every element using js
//the text arg is using to check if there is any text or not
const addNewnote = (text='') => {

    //making the div element
    const note = document.createElement('div');
    //now adding the class to the div
    note.classList.add('note');


    //instead of making every element seperately we are simply using ` ` function
    //to do something under ` ` function we have to use $ SIGN
    const htmldata = `  
    <div class="operation">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
</div>


<div id="main" class="${text?"":"hidden"}"></div>
<textarea class="${text?"hidden":""}"></textarea>`;

/*now we have to add this htmldata under the note div....here we can
simply use note.innerhtml but it is slow so we will use 
adjacent html where it takes two arg 1.where to add this 2.what*/
note.insertAdjacentHTML('afterbegin',htmldata);

//trying to console the div html in console
// console.log(note);

//now we will take reference of the 4 th things to delete edit write
const edit= note.querySelector('.edit');
const del = note.querySelector('.delete');
const main= note.querySelector('#main');
const notetext= note.querySelector('textarea');


/* here we are making the function to delete and also defining
and calling the function at the same time*/
del.addEventListener('click',()=>{
   note.remove(); //this function will simply delte the node

   update_local_storage(); //updating data so that deleted file cent get resored
});

//setting the value for to show this already
notetext.value=text;

//here we are setting thetext that will also show after writing
main.innerHTML=text;

//making the editing button 
edit.addEventListener('click', () =>{

    //toggle is for to off the on element and if off then on
    main.classList.toggle('hidden');
    notetext.classList.toggle('hidden');
})

//event is the parent of every element in this div

notetext.addEventListener('change',(event) =>{
    const value =event.target.value;
    main.innerHTML = value;


    //creating a funtion to store data in the local storage
    update_local_storage();

});




//now we will add the note in the body to see effect like making of the boxes

//aPPEND means WE are adding a node at the end of the a node
document.body.appendChild(note);
}

//here we are getting the data that has stored in the local storage

const nt=JSON.parse(localStorage.getItem('ntext'));

//now we are making the page that after refresh our previous data becom resotr again

/*if there is present any vlaue in the ntext array the they will resotre*/
if(nt){
    nt.forEach((note)=> addNewnote(note))
};


//making the box creating function after clicking add
addbtn.addEventListener('click', () =>  addNewnote());