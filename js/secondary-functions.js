(function() {

  var form = document.querySelector('.form-request');
  var insertSpacesToPrice = function(price) {
    var spacedValue = [];
    var splited = price.toString().split('').reverse();
    splited.forEach((number, i) => {
      if (i % 3 === 0) {
        var splitedWithSpace = `${number} `
        spacedValue.push(splitedWithSpace)
      } else {
        spacedValue.push(number);
      }
    })
    return spacedValue.reverse().join('');
  }

  var getCorrectString = function(stringToCheck) {
    var arrayForFirstWord = [];
    var indexOfFirstSpace = stringToCheck.split('').indexOf(' ');
    if (indexOfFirstSpace !== -1) {
      var i = 0;
      while (i < indexOfFirstSpace) {
        arrayForFirstWord.push(stringToCheck[i])
        i++;
      }
      var firstWord = arrayForFirstWord.join('');
      var arrayOfSplitedStrings = stringToCheck.split(firstWord);
      var newString = firstWord + arrayOfSplitedStrings[1];
    } else {
      newString = stringToCheck
    }
    return newString;

  }

  var inpurCollection = document.querySelectorAll('.input-wrap__input');
  inpurCollection.forEach(function(input) {
    input.addEventListener('click', function(evt) {
      window.handlers.toogleEmptyMessage(evt, input)
    })
  })

  var clearsInputs = function() {
    var formInputs = form.querySelectorAll('input, select, button')
    formInputs.forEach(function(element) {
      element.value = '';
    })
  }

  var getUniqueId = function() {
    var timestamp = new Date().getUTCMilliseconds() + getRandomMinMax(0, 900);
    return timestamp;
  }

  var getRandomMinMax = function(min, max) {
    var randomMinMaxNum = Math.floor(Math.random() * (max - min) + min);
    return randomMinMaxNum;
  }

  window.secondaryFunctions = {
    insertSpacesToPrice: insertSpacesToPrice,
    getCorrectString: getCorrectString,
    clearsInputs: clearsInputs,
    getUniqueId: getUniqueId
  }

})()