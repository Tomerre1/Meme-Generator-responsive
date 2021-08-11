'use strict';

let saveToStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val))
}

let loadFromStorage = key => {
    let val = localStorage.getItem(key)
    return JSON.parse(val)
}