$("#submitBtn").click(async () => {
    const content = $("#secretInput").val();
    if (!content) {
        $(".error").text("Please enter a secret.");
        return;
    }
    const expires_in = $("#expireSelect option:selected").val();
    const password = $("#passwordInput").val();
    const response = await fetch("/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, expires_in, password }),
    });
    const data = await response.json();
    if (data.error) {
        $(".error").text(
            `Secret could not be created: ${data.error}`
        );
    } else {
        let newURL = data.password
            ? `/created?id=${data.id}&password=${data.password}`
            : `/created?id=${data.id}`;
        window.location.href = newURL;
    }
});
