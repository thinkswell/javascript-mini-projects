self.onmessage = async (mssg) => {
  const now = performance.now();
 fetch("https://people.sc.fsu.edu/~jburkardt/data/csv/addresses.csv",{mode: 'no-cors'})
 .then(res=>res.blob())
 .then(blob=>{
   console.log(blob)
   var a = document.createElement('a')
  var file = window.URL.createObjectURL(blob);
             window.location.assign(file);
             
             postMessage("done");


 })

  // let dat = await fetch(
  //   "https://random-data-api.com/api/bank/random_bank?size=100"
  // );
  // let dat1 = await fetch(
  //   "https://random-data-api.com/api/bank/random_bank?size=100"
  // );
  // let dat2 = await fetch(
  //   "https://random-data-api.com/api/bank/random_bank?size=100"
  // );
  // let dat3 = await fetch(
  //   "https://random-data-api.com/api/bank/random_bank?size=100"
  // );
  // let dat4 = await fetch(
  //   "https://random-data-api.com/api/bank/random_bank?size=100"
  // );
  // let dat5 = await fetch(
  //   "https://random-data-api.com/api/bank/random_bank?size=100"
  // );
  // let dat6 = await fetch(
  //   "https://random-data-api.com/api/bank/random_bank?size=100"
  // );
  // let dat7 = await fetch(
  //   "https://random-data-api.com/api/bank/random_bank?size=100"
  // );
  // let dat8 = await fetch(
  //   "https://random-data-api.com/api/bank/random_bank?size=100"
  // );
  // let dat9 = await fetch(
  //   "https://random-data-api.com/api/bank/random_bank?size=100"
  // );
  // let t = await dat.json();
};
