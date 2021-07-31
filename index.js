// Have the function ArrayChallenge(arr) read the array of numbers stored in arr which will represent the hunger level of different people ranging from 0 to 5 (0 meaning not hungry at all, 5 meaning very hungry). You will also have N sandwiches to give out which will range from 1 to 20. The format of the array will be [N, h1, h2, h3, ...] where N represents the number of sandwiches you have and the rest of the array will represent the hunger levels of different people. Your goal is to minimize the hunger difference between each pair of people in the array using the sandwiches you have available.

// For example: if arr is [5, 3, 1, 2, 1], this means you have 5 sandwiches to give out. You can distribute them in the following order to the people: 2, 0, 1, 0. Giving these sandwiches to the people their hunger levels now become: [1, 1, 1, 1]. The difference between each pair of people is now 0, the total is also 0, so your program should return 0. Note: You may not have to give out all, or even any, of your sandwiches to produce a minimized difference.

// Another example: if arr is [4, 5, 2, 3, 1, 0] then you can distribute the sandwiches in the following order: [3, 0, 1, 0, 0] which makes all the hunger levels the following: [2, 2, 2, 1, 0]. The differences between each pair of people is now: 0, 0, 1, 1 and so your program should return the final minimized difference of 2.
// Examples
// Input: [5, 2, 3, 4, 5]
// Output: 1
// Input: [3, 2, 1, 0, 4, 1, 0]
// Output: 4

function hungryPeople(arr) {
  /*
    1. Calculate initial difference between pairs as an array
    2. Function to calculate initial total difference
    3. Set aside the first value in the array as the number of sandwiches we have
    10?. return totalDifference()
  */
  // Assuming our example was hungryPeople([4,5,2,3,1,0])...
  // Just remove the first value, modifying the array.
  
  let sandwiches = arr.shift()
  // sandwiches now equals 4
  // arr = [5,2,3,1,0]
  let initialDifferences = differenceBetweenPairs(arr);
  let initialTotalDifference = totalDifference(initialDifferences);
  console.log(initialDifferences, initialTotalDifference)
  // It can't be this simple... it looks like if I just hit the highest differences
  // first, we'll get the right number. No way.
  let fedDifferences = feedPeople(sandwiches, [...initialDifferences]);
  console.log('after feed', fedDifferences)
  let finalTotalDifference = totalDifference(fedDifferences);
  return finalTotalDifference
}

hungryPeople([5,2,3,4,5])

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

// console.log(differenceBetweenPairs([2,2,2,1,0]))

/*
  Return the sum of the passed in array
  Example: totalDifference([0,0,1,1])
  >> 2
*/
function totalDifference(arr) {
  return arr.reduce((a,b) => {return a + b})
}

// console.log(totalDifference(differenceBetweenPairs([2,2,2,1,0])))

/*
  This can't be this easy.
*/

function feedPeople(sandwiches, arr) {
    // if we don't have sandwiches, or all of the values are the same...
    if (sandwiches === 0 || arr.every(e => e === arr[0])) {
      return arr;
    }
    // sort the array so that the highest differences are first.
    arr.sort((a,b) => b - a)
    console.log('')
    // feed the people!
    for (let i = 0; i < arr.length; i++) {
      // do i have enough sandwiches to feed this person?
      if (arr[i] <= sandwiches) {
        // yes, i do, so reduce sandwiches.
        sandwiches -= arr[i];
        // and i can safely assume i reduced the persons hunger to zero
        arr[i] = 0;
      } else if (arr[i] > sandwiches) {
        // similarly, if i use all my sandwiches
        arr[i] = arr[i] -= sandwiches;
        // i can reduce sandwiches to zero
        sandwiches = 0
      }
    }
    return arr;
}