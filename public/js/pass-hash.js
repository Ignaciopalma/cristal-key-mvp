function passHash(secretWord, destination) {
  var length = secretWord.length;
  var scrambleStage = '';
  var scramble = '';
  var joinWord = (secretWord + destination).split('');  
  
  var charCodes = [];
  for (var i = 0; i < joinWord.length; i++) {
    charCodes.push(joinWord[i].charCodeAt(0));
  }
  
  var newCharCode = charCodes.map(function(code) {
    if(code > 80) {
      return String.fromCharCode(code - 40);
    } else {
      return String.fromCharCode(code + 40);
    }
  });

  function mixRoutine(array, bool) {    
    if(array.length === 0) {
      return;
    }

    if(bool) {
      scrambleStage += array.shift();
    } else {
      scrambleStage += array.pop();
    }

    mixRoutine(array, !bool);
  }

  mixRoutine(newCharCode, true);
  var onDeck = (scrambleStage += length).split('');

  function finalMixRoutine(array, bool) {    
    if(array.length === 0) {
      return;
    }

    if(bool) {
      scramble += array.shift();
    } else {
      scramble += array.pop();
    }

    finalMixRoutine(array, !bool);
  }

  finalMixRoutine(onDeck, true);

  return scramble;
}
document.getElementById("title").innerText += destination;
document.getElementById("key").innerText = passHash(cristalKey, destination);