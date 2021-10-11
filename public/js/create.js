$("#submitBtn").click(async () => {
    const content = $("#secretInput").val();
    if (!content) {
        $(".error").text("Please enter a secret.");
        return;
    }
    const expires_in = $("#expireSelect option:selected").val();
    const response = await fetch("/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, expires_in }),
    });
    const data = await response.json();
    if (data.error || !data.id) {
        console.log(data.error);
        $(".error").text("The secret could not be submitted.");
    } else {
        window.location.href = `/created?id=${data.id}`;
    }
});
