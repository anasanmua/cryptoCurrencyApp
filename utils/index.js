const mongoose = require('mongoose')

const isBegginer = user => user.role = 'BEGGINER'
const isIntermediate = user => user.role = 'INTERMEDIATE'
const isAdavanced = user => user.role = 'ADVANCED'


module.exports = {
    isBegginer, isIntermediate, isAdavanced
}


