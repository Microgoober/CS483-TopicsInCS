// Wait until DOM loads //
document.addEventListener("DOMContentLoaded", function () {
    
    // Elements //
    const rollButton = document.querySelector("button");
    const diceImage = document.querySelector(".outcome");
    const timestamp = document.getElementById("timestamp");

    // Hide dice //
    diceImage.style.visibility = "hidden";

    // Event listener //
    rollButton.addEventListener("click", function () {

        // Generate number //
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        // Log //
        console.log("Dice rolled:", randomNumber);

        // Update image //
        diceImage.src = `./assets/dice${randomNumber}.png`;

        // Make image visible //
        diceImage.style.visibility = "visible";

        // Update timestamp //
        const now = new Date();
        timestamp.textContent = now.toLocaleString();
    });

});
