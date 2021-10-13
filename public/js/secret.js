$("#showBtn").click(async () => {
    const password = hasPassword ? $("#passwordInput").val() : "";
    $("#showBtn, #passwordInput").prop("disabled", true);
    const response = await fetch("/secret", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
    });
    const data = await response.json();
    if (data.error) {
        $(".error").text(data.error);
        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
    } else {
        const content = data.content;
        $("#secretDisplay").text(content);
        $("#showBtn").remove();
        $("#passwordWrapper").remove();
        $("#showSecret").fadeIn();
        enableCopyfunction(content, "#secretDisplay");
    }
});
