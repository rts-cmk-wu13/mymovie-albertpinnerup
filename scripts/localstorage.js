
/**
 * save an item to local sotrage
 * @param {string} key 
 * @param {string | number | boolean | object | any[]} - value to be saved
 */
function saveTolocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}


/**
 * 
 * @param {string} key - key to be read from local storage
 * @returns {string | number | boolean | object | any[]} - value to be read and parsed
 */
function readFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}


/**
 * 
 * @param {string} key 
 * @returns {undefined}
 */
function removeFromLocalStorage(key) {
    localStorage.removeItem(key)
}

let favorites = readFromLocalStorage("favorites") || []




