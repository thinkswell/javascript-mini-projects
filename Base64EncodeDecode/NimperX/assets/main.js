const e = (i) => document.getElementById(i);
const f = (i) => document.getElementsByClassName(i);

const openTab = (evt, name) => {
    var i, tabcontent, tablinks;
    tabcontent = f("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = f("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    e(name).style.display = "block";
    evt.currentTarget.className += " active";
}

const encode = () => e('encoded-text').value = btoa(e('encode-text').value);

const decode = () => e('decoded-text').value = atob(e('decode-text').value);

const copyText = (id) => {
    const copyText = e(id);
    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.value);
    e(id + "-Tooltip").innerHTML = "Copied to clipboard";
}

const outFunc = (ev) => e(ev.target.attributes['data-tooltip'].nodeValue).innerHTML = "Copy to clipboard";

window.onload = () => e("defaultOpen").click();