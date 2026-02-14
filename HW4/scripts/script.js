// Wait until the DOM fully loads
document.addEventListener("DOMContentLoaded", function () {
    
    // Select elements
    const rollButton = document.querySelector("button");
    const diceImage = document.querySelector(".outcome");
    const timestamp = document.getElementById("timestamp");

    // Hide the dice image by default (in case CSS wasn't applied yet)
    diceImage.style.visibility = "hidden";

    // Add click event listener to button
    rollButton.addEventListener("click", function () {

        // Generate random number between 1 and 6
        const randomNumber = Math.floor(Math.random() * 6) + 1;

        // Log result to console (for debugging requirement)
        console.log("Dice rolled:", randomNumber);

        // Update image source dynamically
        diceImage.src = `./assets/dice${randomNumber}.png`;

        // Make image visible after roll
        diceImage.style.visibility = "visible";

        // Update timestamp
        const now = new Date();
        timestamp.textContent = now.toLocaleString();
    });

});
