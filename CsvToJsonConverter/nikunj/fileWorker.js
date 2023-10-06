onmessage = (mssg) => {
 
 
    let f = mssg.data;
    console.log(f)
    let fs = new FileReader();
    fs.readAsBinaryString(f);
    let jsonOutput = [];
    let headers = [];
    fs.onloadend = function (e) {
const rows = e.target.result.split("\r\n")
console.log(rows)
for(let i = 0 ;i<rows.length;i++ ){
  var cells = rows[i].split(",");
  let obj = {};

  for(let j = 0;j<cells.length;j++){

    if(i === 0){
      headers.push(cells[j]);

    }  else{
      obj[headers[j]] = cells[j];

    }
    // console.log(obj)
  }
  jsonOutput.push(obj)

}
console.log(jsonOutput)
      postMessage(JSON.stringify(jsonOutput));
    };
     

}