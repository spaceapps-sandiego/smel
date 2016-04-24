/**
 * @author jjacobson93
 * @date 4/23/2016
 */

function makeRequest(method, url, options, resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open(method, url);

    req.onload = function() {
        // This is called even on 404 etc
        // so check the status
        if (req.status == 200) {
            var resp = req.response;
            if (req.responseType === 'json') {
                resp = JSON.parse(resp);
            }

            // Resolve the promise with the response text
            resolve(resp);
        } else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject(Error(req.statusText));
        }
    };

    // Handle network errors
    req.onerror = function() {
        reject(Error('Network Error'));
    };

    // Make the request
    req.send();
}

/**
 * An AJAX request for GET
 *
 * @param {string} url
 * @param {object} [options]
 */
function get(url, options) {
    return new Promise((resolve, reject) => makeRequest('GET', url, options, resolve, reject)); 
}

export default { get };