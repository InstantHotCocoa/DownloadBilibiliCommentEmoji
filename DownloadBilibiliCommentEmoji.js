var count = 0;
var emojiList = document.querySelectorAll("img[title^='[']");
if (emojiList.length > 0) {
    var intervalID = setInterval(function () {
        var currentValue = emojiList[count];
        var url = currentValue.getAttribute("src").split("@")[0];
        var name = currentValue.getAttribute("title").slice(1, -1) + "." + url.split(".").pop();
        
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = () => {
            if (xhr.status == 200) {
                var urlObject = window.URL || window.webkitURL || window;
                var elem = document.createElement("a");
                elem.href = urlObject.createObjectURL(new Blob([xhr.response]));
                elem.download = name;
                elem.click();
            }
        };
        xhr.send();

        count++;
        if (count >= emojiList.length) {
            clearInterval(intervalID);
        }
    }, 200);
}
