const mongoose = require('mongoose')

const isBegginer = user => user.role = 'BEGGINER'
const isIntermediate = user => user.role = 'INTERMEDIATE'
const isAdavanced = user => user.role = 'ADVANCED'

const profileOwner = (urlUsername, currentUserUsername) => urlUsername === currentUserUsername
const tipOwner = (tipOwnerID, currentUserID) => tipOwnerID === currentUserID
const isAdmin = (a, b) => false
module.exports = {
    isBegginer, isIntermediate, isAdavanced, profileOwner, tipOwner, isAdmin
}


