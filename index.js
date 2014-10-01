(datavis.index = function(){
  var htDeck = document.getElementById('deck');
  var iterations = function() {
    return document.getElementById('inIterations').value;
  };
  var shuffle = document.getElementById('btnShuffle');
  var cut = document.getElementById('btnCut');
  var cutSize = function(){
    return document.getElementById('cutSize').value;
  };
  //initialize deck
  var cards = new datavis.Cards;
  console.dir(cards);
  htDeck.innerHTML = cards.make().join('');



//Events
  shuffle.addEventListener('click', function(e){
      cards.shuffle(iterations());
      htDeck.innerHTML = cards.deck.join('');
    },
    false);

  cut.addEventListener('click', function(e){
      cards.cut(cutSize());
      htDeck.innerHTML = cards.deck.join('');
    },
    false);
})();
