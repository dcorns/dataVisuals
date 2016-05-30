function Ui(){
  console.log('ui2: ');
  var shuffle =document.getElementById('btnShuffle')
    ,cut = document.getElementById('btnCut')
    ,testShuffle = document.getElementById('btnTimeShuffle')
    ,quickSort = document.getElementById('btnQuickSort')
    ,heapSort = document.getElementById('btnHeapSort')
    ,htDeck = document.getElementById('deck')
    ,inIterations = document.getElementById('inIterations')
    ,cutSize =document.getElementById('cutSize');

  return{
    getCutSize: function(){
      return cutSize.value;

    },
    getIterations: function(){
      return inIterations.value;
    },
    showCards: function(cardData){
      console.log('showcards called');
      var cardDataLength = cardData.length;
      var idx = 0;
      htDeck.innerHTML = '';
      for(idx; idx < cardDataLength; idx++){
        htDeck.innerHTML = htDeck.innerHTML + cardData[idx].el;
      }
    },
    cutClickEvent: function(f){
      cut.addEventListener('click', f);
    },
    shuffleClickEvent: function(f){
      shuffle.addEventListener('click', f);
    },
    quickSortClickEvent: function(f){
      quickSort.addEventListener('click', f);
    },
    heapSortClickEvent: function(f){
      heapSort.addEventListener('click', f);
    }
  };
}

module.exports = Ui;
