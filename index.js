// Have the function ArrayChallenge(arr) read the array of numbers stored in arr which will represent the hunger level of different people ranging from 0 to 5 (0 meaning not hungry at all, 5 meaning very hungry). You will also have N sandwiches to give out which will range from 1 to 20. The format of the array will be [N, h1, h2, h3, ...] where N represents the number of sandwiches you have and the rest of the array will represent the hunger levels of different people. Your goal is to minimize the hunger difference between each pair of people in the array using the sandwiches you have available.

// For example: if arr is [5, 3, 1, 2, 1], this means you have 5 sandwiches to give out. You can distribute them in the following order to the people: 2, 0, 1, 0. Giving these sandwiches to the people their hunger levels now become: [1, 1, 1, 1]. The difference between each pair of people is now 0, the total is also 0, so your program should return 0. Note: You may not have to give out all, or even any, of your sandwiches to produce a minimized difference.

// Another example: if arr is [4, 5, 2, 3, 1, 0] then you can distribute the sandwiches in the following order: [3, 0, 1, 0, 0] which makes all the hunger levels the following: [2, 2, 2, 1, 0]. The differences between each pair of people is now: 0, 0, 1, 1 and so your program should return the final minimized difference of 2.
// Examples
// Input: [5, 2, 3, 4, 5]
// Output: 1
// Input: [3, 2, 1, 0, 4, 1, 0]
// Output: 4

// This now solves for 'final total difference' as the problem required
// and includes data afterwards for the amounts to feed every body
function hungryPeople(arr) {
  let sandwiches = arr.shift()
  // Original Strategy
  //let fedArray = feedPeople(sandwiches, [...arr]);
  //let fedDifferences = differenceBetweenPairs(fedArray);
  //return totalDifference(fedDifferences);

  // Feed people while keeping track of who we fed

  let fedArray = feedPeopleTracked(sandwiches, arr);
  let fedDifferences = differenceBetweenPairs(fedArray.map(el => el.hunger))
  let finalTotalDifference = totalDifference(fedDifferences)
  let amountsFed = fedArray.map(el => el.amountFed)
  return [finalTotalDifference, ...amountsFed]
}

function feedPeopleTracked(sandwiches, arr) {
  let peopleArr = arr.map((hunger, i) => {
    return {
      originalPos: i,
      hunger: hunger,
      amountFed: 0,
    }
  })
  console.log(peopleArr)
  peopleArr.sort((a,b) => b.hunger - a.hunger);
  console.log('sorted', peopleArr)
   // iterate. if arr[i] > arr[i+1], and we have sandwiches, feed arr[i] to match 
   // him to i+1
  let i = 0;
  while (i < peopleArr.length && sandwiches >= 0) {
    //console.log("Begin a loop", i, arr[i], arr[i+1])
    if (peopleArr[i].hunger > peopleArr[i+1].hunger) {
      let diff = peopleArr[i].hunger - peopleArr[i+1].hunger;
      //console.log('diff', diff)
      // reduce this persons hunger by the difference or the number of sandwiches, whichever is available
      if (diff > sandwiches) {
        peopleArr[i].hunger -= sandwiches;
        peopleArr[i].amountFed += sandwiches;
      } else {
        peopleArr[i].hunger -= diff;
        peopleArr[i].amountFed += diff;
      }
      // going below zero is fine
      sandwiches -= diff;
      // reset the loop each time we feed someone
      //console.log(`step ${i}`, arr)
      i = 0;
      //console.log('i, sandwiches', i, sandwiches)
    } else {
      i++;
    }
  }
  peopleArr.sort((a,b) => a.originalPos - b.originalPos);
  console.log(peopleArr)
  return [...peopleArr];
}

// These two functions calculate the "total difference"
/* 
  Return an array of the absolute difference between each pair
  Example: differenceBetweenPairs([2,2,2,1,0]) 
  Return: [0,0,1,1]
*/
function differenceBetweenPairs(arr) {
  let output = []
  for (let i = 0; i < arr.length - 1; i++) {
    output = [...output, Math.abs(arr[i] - arr[i+1])]
  }
  return output;
}

/*
  Return the sum of the passed in array
  Example: totalDifference([0,0,1,1])
  >> 2
*/
function totalDifference(arr) {
  return arr.reduce((a,b) => {return a + b})
}

function feedPeople(sandwiches, arr) {
   // Sort the array with most hungry first
   arr.sort((a,b) => b - a);
   //console.log('sorted', arr)
   // iterate. if arr[i] > arr[i+1], and we have sandwiches, feed arr[i] to match 
   // him to i+1
  let i = 0;
  while (i < arr.length && sandwiches >= 0) {
    //console.log("Begin a loop", i, arr[i], arr[i+1])
    if (arr[i] > arr[i+1]) {
      let diff = arr[i] - arr[i+1];
      // reduce this persons hunger by the difference or the number of sandwiches, whichever is available
      if (diff > sandwiches) {
        arr[i] -= sandwiches;
      } else {
        arr[i] -= diff;
      }
      // going below zero is fine
      sandwiches -= diff;
      // reset the loop each time we feed someone
      i = 0;
    } else {
      i++;
    }
    
  }
   // if we make it through without feeding anyone / run out of sandwiches, return the new... thing
   return [...arr];
}

let finalArray = hungryPeople([5, 2, 3, 4, 5])
console.log(`The final total difference is: ${finalArray.shift()}`);
console.log(`And each person should be fed: ${finalArray} pieces of food.`)
