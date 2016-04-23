/**
 * @author jjacobson93
 * @date 4/23/2016
 *
 * Factory function that takes in a function that returns a promise 
 */
let wrap = fn => (...args) => fn(...args).catch(args[2]);

export default wrap;