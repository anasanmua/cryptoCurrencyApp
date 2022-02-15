const User = require("../models/User.model")
const router = require("express").Router()

router.get("/knowledge/crypto", (req, res, next) => {
    res.render('./information/knowledge/crypto')
})

router.get("/knowledge/blockchain", (req, res, next) => {
    res.render('./information/knowledge/blockchain')
})


router.get('/news', (req, res, next) => {

    axios.get()

})

module.exports = router