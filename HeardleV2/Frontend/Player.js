//VARS
var timeIndex = 0
var timings = [1,2,5,10,15,30]
var songName = "testing"
var artist = "testerArtist"

var greenStr = 'rgb(6, 131, 6)'
var redStr = 'rgb(146, 12, 12)'
var greyStr = 'rgb(99, 94, 94)'

var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
//

/*
TODO
clear guess field
Add autocorrect for guesses
Add caching of guesses and limit for day
Add leaderboard
Add daily scripting for new song
*/

init();

function init()
{
    document.addEventListener('DOMContentLoaded', function() {
        autocomplete(document.getElementById("guessBox"), countries);
     }, false);
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
    attemptBox.style.backgroundColor = greenStr;

    timeIndex += 1
}

function winner()
{
    console.log("winner!")
}

function skip()
{
    var inputStr =  "Skip (" + (timings.length - timeIndex) + ")";
    console.log(inputStr)
    attemptGuess(inputStr, 1)
}

function attemptGuess(guessInput=document.getElementById("guessBox").value, isSkip=0)
{
    var guessTextBox = document.getElementById("guess"+timeIndex);
    var attemptBox = document.getElementById("attempt" + timeIndex);
    
    attemptBox.style.backgroundColor = greenStr;
    if (guessInput != songName)
    {
        if (isSkip == 1)
        {
            guessTextBox.style.color = greyStr;
        }
        else
        {
            guessTextBox.style.color = redStr;
        }
    }
    else
    {
        guessTextBox.style.color = greenStr;
        winner()
    }

    timeIndex += 1
    guessTextBox.textContent = guessInput

    
}
function getWordIndices(str) {
    const words = str.split(' '); // Split the string into an array of words
    const indices = [];
  
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const index = str.indexOf(word); // Get the index of the word in the original string
      indices.push(index);
    }
  
    return indices;
  }

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/

          //added code to also check at beginning of each word
          indices = getWordIndices(arr[i])
          console.log('testing ' + val + "indices: " + indices)
          
          for (j = 0; j < indices.length; j++)
          {

            if (arr[i].substr(indices[j], val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                const word = arr[i]
                b.innerHTML += word.substr(0,indices[j]);
                b.innerHTML += "<strong>" + word.slice(indices[j], indices[j] + val.length) + "</strong>";
                b.innerHTML += word.substr(indices[j] + val.length);
                console.log(indices[j] + "; "  + (indices[j] + val.length));
                console.log(word.substr(indices[j], indices[j]))
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }