function playSong() {
    var audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.play();
  }

function playSongDuration(duration) {
    var audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.currentTime = 0; // Start from the beginning of the song
    audioPlayer.play();

    // Pause the song after a specified duration (in milliseconds)
    var durationInMilliseconds = 1000 * duration; // 30 seconds
    setTimeout(function() {
        audioPlayer.pause();
    }, durationInMilliseconds);
}