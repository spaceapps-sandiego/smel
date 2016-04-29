/**
 * @author jjacobson93
 * @date 4/24/2016
 */

function promisify(fn, thisObj) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn.call(thisObj, ...args, function(error, result) {
                if (error) {
                    return reject(error);
                }

                return resolve(result);
            });
        });
    }
}

export default promisify;