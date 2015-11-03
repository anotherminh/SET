###The rules
There are 81 cards total, but at any given round, we’ll only give you 12 cards to play with. The goal is to find all the sets in the card (we’ll tell you how many there are, as it varies from round to round).  

- A card has 4 distinct features:
	-Shape: (example photos)
	-Color: (example photos)
	-Fill: (example photos)
	-Count: (example photos)
- A set contains 3 cards, where each of the features are either the same across three cards, or completely different.

Examples of sets:
 (examples)

These are not sets:
(examples)

###Fun Facts About the Game:
Set is a real-time card game designed by Marsha Falco in 1974 and published by Set Enterprises in 1991.

The largest group of cards you can put together without creating a set is 20.

There are 1080 unique sets.

Given ANY pair of card, there is a unique third card that makes a set.

###How the Game was Built:
To generate the puzzle, I randomly drew twelve cards from the deck,
and check to see if the twelve random cards contained any valid set.
If so, we 'deal' the cards to the user. If not, we run the function again:

<pre><code>
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
</pre></code>

To check to see if the cards contain any sets, I wrote a 'solve' function.
It's a naive solution, with a horrendous n! running time, but I figured
that was ok because I only want to give the user 12 cards at a time
(that's only 220 things to look through). Here's the code:

<pre><code>
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
</pre></code>

The front end of this project presented an interesting aesthetic challenge as well.
The original design was nice and simple, but I wanted to give the game a fresh look.
The problem, then, was how to use HTML & CSS to generate all the possible cards
without having to actually photoshop/create all 81 of them.  

In the end, I only had to manually create the 9 different combinations of pepper + color (there are 3 different peppers, and 3 colors, so 9 combinations). I generate the
background color and the number of peppers based on the fly, and center them as appropriate.
