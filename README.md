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

###Fun facts about the game, and how it was built:
Set is a real-time card game designed by Marsha Falco in 1974 and published by Set Enterprises in 1991.

The largest group of cards you can put together without creating a set is 20.

There are 1080 unique sets.

Given ANY pair of card, there is a unique third card that makes a set.

This last fact was crucial to building the game. To generate a new puzzle, we do the following:

1) Generate 2-5 distinct pairs (the pairs can share at most one card with each other).

2) Finish the set by generating the third member for every pair.The process of generating the third member is pretty straight forward:

- a) Compare every feature of the pair, assigning 0 if different, and 1 if similar.
- b) If 0, then pick the feature that isn’t the same as that feature.
- c) If 1, then pick the feature that is the same.

3) If we have less than 12 cards, then add random cards to the pile (but these have to NOT create new pairs, because we want to keep track of how many solutions there are to inform the player that the game is over).

Add this card to the pair, and we have a set.

Remove any  duplicates.

Then add random cards to the pile until we have 12.

Shuffle and play!
