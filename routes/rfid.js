var express = require('express');
var router = express.Router();
var config = require('../config');
var tokens = require('../tokens');
var ldap = require('../modules/ldap');

/* GET User for rfid String. */
router.get('/:id', function(req, res, next) {
    if (tokens.indexOf(req.headers.token) > -1) {
        var result = res;
        ldap.findRfidCard(req.params.id,function (err, res) {
            result.send(res);
        });
    } else {
        res.send({"error":"Invalid Token"});
    }
});

module.exports = router;




