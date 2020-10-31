
const submitBtn=document.querySelector('.submitBtn');
const dataValue1=document.querySelector('.data-1');
const dataValue2=document.querySelector('.data-2');
const dataValue3=document.querySelector('.data-3');
const dataValue4=document.querySelector('.data-4');
const backdrop=document.querySelector('.Backdrop');
const inp=document.querySelector('input[type=text]');

submitBtn.addEventListener('click',async (e) => {
    e.preventDefault();
    let url=inp.value;
    url=url.trim();
    const urlArr=url.split('/');

    inp.value="";

    if(urlArr.length===5 && urlArr[0]==="https:" && urlArr[1]==="" && urlArr[3] && urlArr[4]){
        backdrop.style.display="block";

        const res=await axios({
            method:'post',
            url:'/getIssuesInfo',
            data:{url}
        });

        dataValue1.innerHTML=res.data["TotalOpenIssuesCount"];
        dataValue2.innerHTML=res.data["LastOneDayOpenedIssuesCount"];
        dataValue3.innerHTML=res.data[ "LastSevenDaysButMoreThanOneDayCount"];
        dataValue4.innerHTML=res.data["BeforeSevenDaysIssuesCount"];

        backdrop.style.display="none";
    }
    
    else{
        alert("Enter url exactly of the form : https://github.com/{username}/{repo_name}");
    }
});





