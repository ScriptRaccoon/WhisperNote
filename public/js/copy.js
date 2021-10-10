function copyStringToClipboard(str) {
    var el = document.createElement("textarea");
    el.style.opacity = 0;
    el.value = str;
    el.setAttribute("readonly", "");
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    el.remove();
}

function enableCopyfunction(str, selector) {
    $("#copyBtn").click(() => {
        copyStringToClipboard(str);
        $("#copyInfo").slideDown(100);
        $(selector).addClass("flash");
        $("#copyBtn").prop("disabled", true);
        setTimeout(() => {
            $("#copyBtn").prop("disabled", false);
            $("#copyInfo").slideUp(100);
            $(selector).removeClass("flash");
        }, 2000);
    });
}
