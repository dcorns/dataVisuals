/**
 * heapSort
 * Created by dcorns on 5/28/16
 * Copyright © 2016 Dale Corns
 * nLog(n)
 */
'use strict';
module.exports = function(){
  return {
    sort: function(ary){
      var maxHeap = buildMaxHeap(ary);
      var sorted = sortMaxHeap(maxHeap);
      return sorted;
    };
  }
};

function buildMaxHeap(ary){//On complexity
  var i = ary.length/2;
  for(i; i > 0; i--){
    ary = maxHeapify(ary, i)
  }
  return ary;
}

function maxHeapify(ary, idx){//Olog(n)
  var root = ary[idx], left = ary[idx * 2], right = ary[idx * 2 +1];
  if (left > right && left > root){
    ary[idx] = left;
    ary[idx * 2] = root;
    return ary;
  }
  else{
    if(right > root){
      ary[idx] = right;
      ary[idx * 2 + 1] = root;
    }
  }
  return root;
}

function sortMaxHeap(mHeap, ary){
  var maxHeap = ary || [];
  if(mHeap.length > 2){
    
  }
  else if(mHeap[0] > mHeap[1]){
    ary.push(mHeap[0], mHeap[1]);
  }
  else{
    ary.push(mHeap[1], mHeap[0]);
  }
}