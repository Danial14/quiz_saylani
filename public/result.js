let wrongAnswers = JSON.parse(localStorage.getItem("Wrong_Answers"));
let correctAnswers = JSON.parse(localStorage.getItem("Correct_Answers"));
let userScore = localStorage.getItem("Total_Score");
function evaluateResult(){
    if(wrongAnswers.length == 0){
        let eleMent = document.getElementById("all_correct_answers");
        eleMent.style.visibility = "visible";
    }
    else{
        createCards();
        console.log(wrongAnswers.length);
    }
    localStorage.clear();
}
evaluateResult();
function createCards(){
    let container = document.getElementsByClassName("list-group")[0];
    for(let i = 0; i < wrongAnswers.length; i++){
        let card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("mb-3");
        let cardIMage = document.createElement("img");
        cardIMage.className = "card-img-top";
        cardIMage.src = wrongAnswers[i];
        cardIMage.alt = "Wrong answer no." + (i + 1);
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        let cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerHTML = "Incorrect answer";
        let cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.innerHTML = "Your answer which is given in the above iMage is incorrect and the correct answer is " + correctAnswers[i];
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardIMage);
        card.appendChild(cardBody);
        container.appendChild(card);
    }
    let score = document.createElement("p");
    score.classList.add("h5");
    score.classList.add("text-center");
    score.innerHTML = "Your score is " + userScore + " out of 9";
    container.parentElement.appendChild(score);
    
}