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
      console.log('maxHeap: ', maxHeap);
      var sorted = sortMaxHeap(maxHeap);
      return sorted;
    }
  }
};

function buildMaxHeap(ary){//O(log (n)) complexity
  var i = Math.floor(((ary.length - 1)/2));
  for(i; i > -2; i--){
    ary = maxHeapify(ary, i)
  }
  return ary;
}

function maxHeapify(ary, idx){//O(n)
    var root = ary[idx];
    var lidx = idx * 2 + 1, ridx = idx * 2 + 2;
    var left = ary[lidx];
    var right = ary[ridx];
    if (left > right && left > root){
      ary[idx] = left;
      ary[lidx] = root;
      maxHeapify(ary, lidx);
    }
    else{
      if(right > root){
        ary[idx] = right;
        ary[ridx] = root;
        maxHeapify(ary, ridx);
      }
    }
  return ary;
}

function sortMaxHeap(mHeap, ary){//O(n log(n))
  var sortedHeap = ary || [];
  if(mHeap.length > 2){
    sortedHeap.push(mHeap[0]);
    mHeap.splice(0, 1, mHeap.pop());
    mHeap = maxHeapify(mHeap, 0);
    sortMaxHeap(mHeap, sortedHeap);
  }
  else if(mHeap[0] > mHeap[1]){
    sortedHeap.push(mHeap[0], mHeap[1]);
  }
  else{
    sortedHeap.push(mHeap[1], mHeap[0]);
  }
  return sortedHeap;
}