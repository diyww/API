var ldap = require('ldapjs');
var express = require('express');
var router = express.Router();
var config = require('../config');
var tokens = require('../tokens');
var _ = require('underscore');

var client = ldap.createClient({
    url: config.ldap.server+":"+config.ldap.port
});
client.bind(config.ldap.bindUser, config.ldap.bindPW, function(err) {
    //assert.ifError(err);
});

/* GET User for rfid String. */
router.get('/:id', function(req, res, next) {


    if (tokens.indexOf(req.headers.token) > -1) {

        console.log(req.headers.token);

        var opts = {
            filter: '(employeeNumber='+req.params.id+')',
            scope: 'sub'
        };

        client.search('ou=Mitglieder,dc=diyww,dc=de', opts, function(err, result) {
            //assert.ifError(err);
            var resultFound = false;
            result.on('searchEntry', function(entry) {
                resultFound = true;
                var data = entry.object;
                res.send(_.omit(data, ['userPassword']));
            });
            result.on('searchReference', function(referral) {
                res.send('referral: ' + referral.uris.join());
            });
            result.on('error', function(err) {
                res.send('error: ' + err.message);
            });

            result.on('end', function(result) {
                if(!resultFound){
                    res.send({"error":"No Result"});
                }
            });
        });
    } else {
        res.send({"error":"Invalid Token"});
    }
});

module.exports = router;




