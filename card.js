var _SHAPES = ["A", "B", "C"]
var _FILLS = ["L", "M", "N"]
var _COLORS = ["X", "Y", "Z"]
var _COUNTS = [1, 2, 3]

var Deck = function () {
  this.solution = [];
  this.playableCards = this.getTwelveCards();
}

Deck.isASet = function (threeCards) {
  var isASet = true,
  card1 = threeCards[0],
  card2 = threeCards[1],
  card3 = threeCards[2];

  for (var i = 0; i < 4; i++) {
    if (
      !((card1[i] === card2[i] && card2[i] === card3[i]) && card1[i] === card3[i]) &&
      !((card1[i] !== card2[i] && card2[i] !== card3[i]) && card1[i] !== card3[i])
    ) {
      isASet = false;
    }
  }

  return isASet;
}

Deck.allCards = function () {
  var allCards = [];
  _SHAPES.forEach(function (shape) {
    _FILLS.forEach(function (fill) {
      _COLORS.forEach(function (color) {
        _COUNTS.forEach(function (count) {
          allCards.push(shape + fill + color + count);
        })
      })
    })
  })

  return allCards;
}

Deck.solve = function (cards) {
  var solutions = [];
  for (var i = 0; i < (cards.length - 2); i++) {
    for (var j = i + 1; j < (cards.length - 1); j++) {
      for (var k = j; k < cards.length; k++) {
        var threeCards = [cards[i], cards[j], cards[k]]
        if (Deck.isASet(threeCards)) {
          solutions.push(threeCards);
        }
      }
    }
  }
  return solutions;
}

Deck.prototype.getTwelveCards = function () {
  var playableDeck = [], allCards = Deck.allCards();

  for (var i = 0; i < 12; i++) {
    randomIdx = Math.floor(Math.random() * allCards.length);
    playableDeck.push(allCards.splice(randomIdx, 1)[0]);
  }

  var solution = Deck.solve(playableDeck);
  if (solution.length > 0) {
    this.solution = solution;
    return playableDeck;
  } else {
    debugger;
    return this.getTwelveCards().bind(this);
  }
}

// var three = [ [ 'CMZ1' ], [ 'AMY1' ], [ 'CLX2' ] ];
// var cards = new Deck ();
// console.log(Deck.isASet(three));
// console.log(cards.solution.length);
