var index = 0;

function ChangeColor(){
    color = ["red","green","blue","yellow","purple","orange","pink","violet"]

    document.getElementById("button").style.background= color[index++];

    if(index > color.length-1)
    index = 0;
}