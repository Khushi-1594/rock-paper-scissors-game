document.addEventListener("DOMContentLoaded", () => {
    const choices = ["rock", "paper", "scissors"];
    const rulesPopup = document.getElementById("rules-popup");
    const closeRulesBtn = document.querySelector(".close-btn");
    const rulesBtn = document.getElementById("rules-btn");
    const resultCircle = document.getElementById("result-circle");
    const playerScoreElem = document.getElementById("player-score");
    const computerScoreElem = document.getElementById("comp-score");
    const resultMessageElem = document.getElementById("result-message");
    const nextButton = document.getElementById("next-btn");
    const playAgainButton = document.getElementById("play-again-btn");
    const resultContentH3 = document.querySelector(".result-content h3");

    const playerChoiceContainer = document.querySelector("#player-choice .circle")
    const computerChoiceContainer = document.querySelector("#computer-choice .circle")

    let playerScore = parseInt(localStorage.getItem("playerScore")) || 0;
    let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

    if (playerScoreElem) playerScoreElem.textContent = playerScore;
    if (computerScoreElem) computerScoreElem.textContent = computerScore;

    const circleButtons = document.querySelectorAll(".circle");
    if (circleButtons.length > 0 && !resultCircle) {
        circleButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const playerChoice = button.dataset.choice;
                const playerImage = `images/${playerChoice}.png`;

                localStorage.setItem("playerChoice", playerChoice);
                localStorage.setItem("playerImage", playerImage);

                const computerChoice = choices[Math.floor(Math.random() * 3)];
                const computerImage = `images/${computerChoice}.png`;

                localStorage.setItem("computerChoice", computerChoice);
                localStorage.setItem("computerImage", computerImage);

                window.location.href = "result.html";
            });
        });
    }

    if (resultMessageElem) {
        const playerChoice = localStorage.getItem("playerChoice");
        const playerImage = localStorage.getItem("playerImage");
        const computerChoice = localStorage.getItem("computerChoice");
        const computerImage = localStorage.getItem("computerImage");

        displayChoice("player-choice", playerImage, playerChoice);
        displayChoice("computer-choice", computerImage, computerChoice);

        let resultMessage = "";
        if (playerChoice === computerChoice) {
            resultMessage = "TIE UP";
            if (resultContentH3) resultContentH3.remove();
            if (nextButton) nextButton.style.display = "none";
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            resultMessage = "YOU WIN";
            playerScore++;
            playerChoiceContainer.classList.add("winner");
        } else {
            resultMessage = "YOU LOST";
            computerScore++;
            if (nextButton) nextButton.style.display = "none";
            computerChoiceContainer.classList.add("winner");
        }

        localStorage.setItem("playerScore", playerScore);
        localStorage.setItem("computerScore", computerScore);

        if (playerScoreElem) playerScoreElem.textContent = playerScore;
        if (computerScoreElem) computerScoreElem.textContent = computerScore;

        resultMessageElem.textContent = resultMessage;

        // if (playAgainButton) {
        //     playAgainButton.addEventListener("click", () => {
        //         window.location.href = "index.html";
        //     });
        // }

        if(nextButton){
            nextButton.addEventListener("click",()=>{
                window.location.href = "congratulations.html";
            })
        }
    }

        rulesBtn.addEventListener("click", () => (rulesPopup.style.display = "block"));
        closeRulesBtn.addEventListener("click", () => (rulesPopup.style.display = "none"));
        playAgainButton.addEventListener("click", () => (window.location.href = "index.html"));
    
    function displayChoice(elementId, imagePath, choice) {
        const choiceContainer = document.getElementById(elementId);
        if (choiceContainer) {
            const circleElem = choiceContainer.querySelector(".circle");
            if (circleElem) {
                circleElem.innerHTML = `<img src="${imagePath}" alt="${choice}">`;
                circleElem.style.border = `12px solid ${getBorderColor(choice)}`;
            }
        }
    }

    function getBorderColor(choice) {
        switch (choice) {
            case "rock":
                return "#0074D9"; 
            case "paper":
                return "#FF851B";
            case "scissors":
                return "#B10DC9";
            default:
                return "#ffffff";
        }
    }
    
});
