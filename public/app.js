let questionS;
let userScore = 0;
var databaseReference = firebase.database().ref("questionS");
databaseReference.on("value", function(snapshot){
    questionS = snapshot.val();
    updateUI();
});

const quizQuestion = document.getElementById("quiz_question");
const optionS = document.getElementsByTagName("label");
const tiMer = document.getElementById("tiMer");
const radios = document.getElementsByTagName("input");
const spaceLastIndexPlusOne = tiMer.innerHTML.lastIndexOf(" ") + 1;
const MyStorage = window.localStorage;
let wrongAnswers = [];
let correctAnswers = [];
let questionIndex = 0;
let userAnswer = "";
function updateUI(){
    if(questionIndex == questionS.length){
        const correctAnswer = questionS[questionIndex - 1].correctAnswer;
        if(userAnswer != correctAnswer){
            html2canvas(document.body).then(function(canvas) {
                wrongAnswers.push(canvas.toDataURL());
                correctAnswers.push(correctAnswer);
                MovetoResultPage();
            });
          }
           else{
               userScore++;
               MovetoResultPage();
           }
    }
    else{
    userAnswer = "";
    const ques = questionS[questionIndex];
    quizQuestion.innerHTML = ques.question;
    for(let i = 0; i < 4; i++){
        switch(i){
            case 0:
                optionS[i].innerHTML = ques.option1;
                break;
            case 1:
                optionS[i].innerHTML = ques.option2;
                break;
            case 2:
                optionS[i].innerHTML = ques.option3;
                break;
            case 3:
                optionS[i].innerHTML = ques.option4;
                break;
        }
    }
  }
}
function check(){
    const correctAnswer = questionS[questionIndex].correctAnswer;
    console.log(userAnswer);
    console.log(correctAnswer);
    if(questionIndex != questionS.length - 1){
        if(userAnswer != correctAnswer){
            html2canvas(document.body).then(function(canvas) {
                wrongAnswers.push(canvas.toDataURL());
                correctAnswers.push(correctAnswer);
            });
        }
        else{
            userScore++;
        }
  }
   questionIndex++;
   stopTiMer();
   let index = parseInt(userAnswer.slice(userAnswer.length - 1));
   updateUI();
   startTiMer();
   radios[index - 1].checked = false;
}
let tiMerId;
startTiMer();
function increMentSecond(){
    let tiMerValue = tiMer.innerHTML;
    var increMentedSecond = parseInt(tiMerValue.slice(spaceLastIndexPlusOne));
    increMentedSecond++;
    if(increMentedSecond == 60){
        check();
    }
    else if(increMentedSecond < 10){
        tiMer.innerText = tiMerValue.slice(0, tiMerValue.indexOf(":") + 1) + " 0" + increMentedSecond;
    }
    else{
        tiMer.innerText = tiMerValue.slice(0, tiMerValue.indexOf(":") + 1) + " " + increMentedSecond;
    }
}
function startTiMer(){
    tiMerId = setInterval(increMentSecond, 1000);
}
function stopTiMer(){
    clearInterval(tiMerId);
    tiMer.innerHTML = "00 : 00";
}
function userChoice(index){
    userAnswer = "option" + (index+1);
}
function MovetoResultPage(){
    window.location.replace("result.html");
        MyStorage.setItem("Wrong_Answers", JSON.stringify(wrongAnswers));
        MyStorage.setItem("Correct_Answers", JSON.stringify(correctAnswers));
        MyStorage.setItem("Total_Score", userScore.toString());
        stopTiMer();
}
