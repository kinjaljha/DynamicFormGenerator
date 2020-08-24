/**
 * function to deep copy object
 */
const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

export { deepCopy }