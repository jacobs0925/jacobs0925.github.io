//VARS
var timeIndex = 0
var timings = [1,2,5,10,15,30]
var songName = "testing"
var artist = "testerArtist"
//

function playSong() {
    var audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.play();
  }

function playSong() {
    var audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.currentTime = 0; // Start from the beginning of the song
    audioPlayer.play();

    // Pause the song after a specified duration (in milliseconds)
    var durationInMilliseconds = 1000 * timings[timeIndex]; // 30 seconds
    setTimeout(function() {
        audioPlayer.pause();
    }, durationInMilliseconds);

    // Change attempt box to green
    var attemptBox = document.getElementById("attempt" + timeIndex);
    attemptBox.style.backgroundColor = "green";

    timeIndex += 1
}

function winner()
{
    console.log("winner!")
}

function attemptGuess()
{
    var guess = document.getElementById("guessBox").value;
    var guessTextBox = document.getElementById("guess"+timeIndex);
    var attemptBox = document.getElementById("attempt" + timeIndex);
    
    attemptBox.style.backgroundColor = "green";
    if (guess != songName)
    {
        guessTextBox.style.backgroundColor = "red";
    }
    else
    {
        guessTextBox.style.backgroundColor = "green";
        winner()
    }

    timeIndex += 1
    guessTextBox.textContent = guess

    
}