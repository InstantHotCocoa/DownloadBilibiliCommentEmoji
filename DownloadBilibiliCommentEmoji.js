var count = 0;
var id = setInterval(function () {
    var currentValue = document.querySelectorAll("a.emoji-pic")[count];
    var url = currentValue.childNodes[0].getAttribute("src").split("@")[0];
    var name = currentValue.childNodes[0].getAttribute("title").slice(1, -1) + ".png";

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
        if (xhr.status === 200) {
            var urlObject = window.URL || window.webkitURL || window;
            var elem = document.createElement("a");
            elem.href = urlObject.createObjectURL(new Blob([xhr.response]));
            elem.download = name;
            elem.click();
        }
    };

    xhr.send();
    count++;
    if (count == document.querySelectorAll("a.emoji-pic").length) {
        clearInterval(id)
    }
}, 1000);
