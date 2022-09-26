// Jest crashes if it tries to parse scss modules
// This file mocks the style sheet so that Jest won't crash
// https://stackoverflow.com/questions/54627028/jest-unexpected-token-when-importing-css

module.exports = {}
