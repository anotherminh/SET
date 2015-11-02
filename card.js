var _SHAPES = ["A", "B", "C"]
var _FILLS = ["L", "M", "N"]
var _COLORS = ["X", "Y", "Z"]
var _COUNTS = [1, 2, 3]

window.Card = function () {
  this.setsCount = 0;
  this.allCards = Card.generateCards();
  this.allPairs = this.generateAllPairs();
  this.sets = this.buildSets();
  this.playableDeck = this.getPlayableCards();
};

// generates random int. between min (inclusive) and max (exclusive)
var _getRandomInt = window._getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

Card.generateCards = function () {
  var cards = [];
  _SHAPES.forEach(function (shape) {
    _FILLS.forEach(function (fill) {
      _COLORS.forEach(function (color) {
        _COUNTS.forEach(function (count) {
          cards.push(shape + fill + color + count);
        })
      })
    })
  })

  return cards;
}

Card.prototype.generateAllPairs = function () {
  var deck = this.allCards;
  var _allPairs = [];

  deck.forEach(function (card1) {
    deck.forEach(function (card2) {
      _allPairs.push([card1, card2]);
    })
  })

  return _allPairs;
}

Card.prototype.buildSets = function () {
  var allPairs = this.allPairs.slice();
  var pickedPairs = [];

  var numPairs = _getRandomInt(2, 4);
  this.setsCount = numPairs;

  for (var i = 0; i < numPairs; i++) {
    var cardIdx = _getRandomInt(0, 3240);
    pickedPairs.push(allPairs.splice(cardIdx, 1)[0]);
  }

  var sets = pickedPairs.map(function (pair) {
    var thirdCard = this.findThirdCard(pair);
    pair.push(thirdCard);
    return pair;
  }.bind(this))

  return this.removeDuplicates(sets);
}

Card.prototype.removeDuplicates = function (sets) {
  var cardCounts = {};
  var flattened = [].concat.apply([], sets);

  flattened.forEach(function (card) {
    cardCounts[card] = 1;
  })

  return Object.keys(cardCounts);
}

Card.prototype.findThirdCard = function (pair) {
  var firstCard = pair[0];
  var secondCard = pair[1];
  var thirdCard = "";

  for (var i = 0; i < 4; i++) {
    var symbol1 = firstCard[i];
    var symbol2 = secondCard[i];
    if (symbol1 === symbol2) {
      thirdCard += symbol1;
    } else {
      switch (i) {
        case 0:
          var type = _SHAPES.slice();
          break;
        case 1:
          var type = _FILLS.slice();
          break;
        case 2:
          var type = _COLORS.slice();
          break;
        case 3:
          var type = _COUNTS.slice();
          break;
        }

      type.splice(type.indexOf(symbol1), 1);
      type.splice(type.indexOf(symbol2), 1);

      thirdCard += type[0];
    }
  }

  return thirdCard;
}

Card.prototype.getPlayableCards = function () {
  var playableCards = this.sets;
  var dupDeck = this.allCards.slice();

  while (playableCards.length < 12) {
    randomIdx = _getRandomInt(0, this.allCards.length);
    randomCard = dupDeck.splice(randomIdx, 1)[0];
    playableCards.push(randomCard);
    playableCards = this.removeDuplicates(playableCards);
  }

  return playableCards.sort(function() { return 0.5 - Math.random() });;
}
