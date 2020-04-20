function generateHtml() {

    function convert(str)
    {
        str = str.replace(/&/g, "&amp;");
        str = str.replace(/>/g, "&gt;");
        str = str.replace(/</g, "&lt;");
        str = str.replace(/"/g, "&quot;");
        str = str.replace(/'/g, "&#039;");
        return str;
    }

    const previewPanel = document.getElementById("previewPanel");
    previewPanel.innerHTML = "";
    const htmlPre = document.getElementById("htmlContent");
    htmlPre.textContent = "";

    const hasHeaders = document.querySelector('#hasHeader:checked');
    const text = document.getElementById("input").value;
    const split = text.split(/\r?\n/);

    var output = "<table>";
    if (hasHeaders != undefined) {
        output += "\r\n <thead>\r\n  <tr>";
        const tds = split[0].split(/\t/);

        tds.forEach(element => {
            output += "\r\n\   <th>" + convert(element) + "</th>";
        });

        output += "\r\n\  </tr>\r\n </thead>";
        split.shift();
    }


    split.forEach(row => {
        if (!row || row.trim().length < 1)
            return true;
        var tds = row.split(/\t/);
        output += "\r\n  <tr>";
        tds.forEach(element => {
            output += "\r\n\   <td>" + convert(element) + "</td>";
        });

        output += "\r\n  </tr>";
        return true;
    });
    output += "\r\n</table>";

    previewPanel.innerHTML = output;

    htmlPre.classList.remove("prettyprinted");
    htmlPre.textContent = output;
}

function showCopied() {
    var c = document.getElementById("copy-message");
    c.classList.remove("copy-message-animation");
    setTimeout(() => c.classList.add("copy-message-animation"), 100);
}

function copyHtmlCode() {
    navigator.clipboard.writeText(document.getElementById("htmlContent").textContent).then(function() {
        showCopied();
    }, function() {
        alert("Failed to copy the text to clipboard!");
    });
}


function copyHtml() {
    let element = document.getElementById("previewPanel");
    window.getSelection().removeAllRanges();
    let range = document.createRange();
    range.selectNode(typeof element === 'string' ? document.getElementById(element) : element);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    showCopied();
}

function clearAll() {
    const previewPanel = document.getElementById("previewPanel");
    previewPanel.innerHTML = "";
    const htmlPre = document.getElementById("htmlContent");
    htmlPre.textContent = "";
    document.getElementById("input").value = "";
}

