// 1111111111
/**
 * @return {Function}
 */
var createHelloWorld = function() {
    return function(...args) {
        return "Hello World"
    }
};

//  const f = createHelloWorld();
//  f(); // "Hello World"


// 2222222
/**
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function(n) {
    
    return function() {
        return n++
    };
};

/** 
 * const counter = createCounter(10)
 * counter() // 10
 * counter() // 11
 * counter() // 12
 */

// 333333
/**
 * @param {string} val
 * @return {Object}
 */
var expect = function(val) {
    return {
        toBe: (arg) => {
            if (val === arg) {
                return true
            } else {
                throw new Error("Not Equal")
            }
        },
        notToBe: (arg) => {
            if (val !== arg) {
                return true
            } else {
                throw new Error("Equal")
            }
        }
    }
};

/**
 * expect(5).toBe(5); // true
 * expect(5).notToBe(5); // throws "Equal"
 */

// 44444444
/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function(init) {
    var ctr = init
    return {
        increment: () => {
            return ++ctr
        },
        decrement: () => {
            return --ctr
        },
        reset: () => {
            ctr = init
            return ctr
        }
    }
};

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */

// 5555555
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn) {
    var returnedArray = []
    for (let i = 0; i < arr.length; i++) {
        returnedArray[i] = fn(arr[i], i)
    }
    return returnedArray
};

// 66666666
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function(arr, fn) {
    var returnedArray = []
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i], i)) {
            returnedArray.push(arr[i])
        }
    }
    return returnedArray
};

// 7777777777
/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function(nums, fn, init) {
    if (nums.lenght === 0) 
        return init
    for (let i = 0; i < nums.length; i++) {
        init = fn(init, nums[i]);
    } 
    return init
};

// 888888
/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function(functions) {
	return function(x) {
        if (functions.length > 0) {
            let temp = x
            for(var i = functions.length - 1; i >= 0; i--) {
                temp = functions[i](temp);
            }
            return temp
        }
        return x
    }
};

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */


// 999999999
/**
 * @return {number}
 */
var argumentsLength = function(...args) {
    return args.length;
};

/**
 * argumentsLength(1, 2, 3); // 3
 */


// 10 ten ten ten
/**
 * @param {Function} fn
 * @return {Function}
 */
var once = function(fn) {
    var ctr = 0
    return function(...args){
        if (ctr < 1) {
            ctr++
            return fn(...args)
        } 
        return undefined
    }
};

/**
 * let fn = (a,b,c) => (a + b + c)
 * let onceFn = once(fn)
 *
 * onceFn(1,2,3); // 6
 * onceFn(2,3,6); // returns undefined without calling fn
 */


// 11 eleven eleven
/**
 * @param {Promise} promise1
 * @param {Promise} promise2
 * @return {Promise}
 */
var addTwoPromises = async function(promise1, promise2) {
    return await promise1 + await promise2
};

/**
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 */


// 12 12 12 12 
/**
 * @param {number} millis
 */
async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

/** 
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */

// 13 13 13 13
var cancellable = function(fn, args, t) {
    let timer = setTimeout(() => {
        fn(...args)
    }, t)

    let cancelFn = function () {
        clearTimeout(timer)
    }

    return cancelFn
};


// 14 14 14 14 
var cancellable = function(fn, args, t) {
    
    fn(...args)

    let intval = setInterval(() => {
        fn(...args)
    }, t)

    let cancelFn = function() {
        clearInterval(intval)
    }

    return cancelFn
};

//  15 15 15 15 
/**
 * @param {Object | Array} obj
 * @return {boolean}
 */
var isEmpty = function(obj) {
    return Object.keys(obj).length === 0
};

// 16 16 16 16 
var chunk = function(arr, size) {
    const result = [];

    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }

    return result;
};


// 17 17 17 17 17 

Array.prototype.last = function() {
    let len = this.length
    
    if (len > 0) {
        return this[len - 1]
    } else {
        return -1
    }
};


// 18 18 18 18

function sortBy(arr, fn) {
    if (arr.length <= 1) {
      return arr.slice();
    }
  
    const mid = Math.floor(arr.length / 2);
    const arrLeft = arr.slice(0, mid);
    const arrRight = arr.slice(mid);
  
    return merge(sortBy(arrLeft, fn), sortBy(arrRight, fn), fn);
  }
  
  function merge(left, right, fn) {
    const sortedArray = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
      if (fn(left[leftIndex]) < fn(right[rightIndex])) {
        sortedArray.push(left[leftIndex]);
        leftIndex++;
      } else {
        sortedArray.push(right[rightIndex]);
        rightIndex++;
      }
    }
  
    return sortedArray.concat(left.slice(leftIndex), right.slice(rightIndex));
  }



//    19 19 19 19
var ArrayWrapper = function(nums) {
    this.nums = nums
};

ArrayWrapper.prototype.valueOf = function() {
    return this.nums.reduce((sum, num) => sum + num, 0);
}

ArrayWrapper.prototype.toString = function() {
    return '[' + this.nums.join(',') + ']';
}

// 20 20 20 20 

class Calculator {
  
    /** 
     * @param {number} value
     */
    constructor(value) {
        this.value = value
    }
  
    /** 
     * @param {number} value
     * @return {Calculator}
     */
    add(value){
        this.value += value 
        return this
    }
  
    /** 
     * @param {number} value
     * @return {Calculator}
     */
    subtract(value){
      this.value -= value 
      return this
    }
  
    /** 
     * @param {number} value
     * @return {Calculator}
     */  
    multiply(value) {
      this.value *= value 
      return this
    }
  
    /** 
     * @param {number} value
     * @return {Calculator}
     */
    divide(value) {
      if (value != 0) {
        this.value /= value 
        return this
      } else {
        throw new Error("Division by zero is not allowed");
      }
    }
    
    /** 
     * @param {number} value
     * @return {Calculator}
     */
    power(value) {
      this.value = Math.pow(this.value, value) 
      return this
    }
      
    /** 
     * @return {number}
     */
    getResult() {
        return this.value
    }
  }