var config = require('../config');
var ldapjs = require('ldapjs');
var _ = require('underscore');

var client = ldapjs.createClient({
    url: config.ldap.server+":"+config.ldap.port
});
client.bind(config.ldap.bindUser, config.ldap.bindPW, function(err) {
    //assert.ifError(err);
});

var ldap = {
    findRfidCard: function (rfid,cb) {
        var opts = {
            filter: '(employeeNumber='+rfid+')',
            scope: 'sub'
        };
        var base = 'ou=Mitglieder,dc=diyww,dc=de';
        this._search(base,opts,cb);
    },
    findEmail: function (email,cb) {
        var opts = {
            filter: '(mail='+email+')',
            scope: 'sub'
        };
        var base = 'ou=Mitglieder,dc=diyww,dc=de';
        this._search(base,opts,cb);
    },
    replacePassword: function (email,password,cb) {
        this.findEmail(email,function (err,res) {
            var change = new ldapjs.Change({
                operation: 'replace',
                modification: {
                    userPassword: password
                }
            });
            client.modify(res.dn, change, function(err) {
                //assert.ifError(err);
                cb(err,true);
            });

        });
    },
    _search: function (base,opts,cb) {
        client.search(base, opts, function(err, result) {
            //assert.ifError(err);
            if(err){
                cb(err);
            }
            var resultFound = false;
            result.on('searchEntry', function(entry) {
                resultFound = true;
                var data = entry.object;
                cb(false,_.omit(data, ['userPassword']));
            });
            result.on('searchReference', function(referral) {
                cb(false,'referral: ' + referral.uris.join());
            });
            result.on('error', function(err) {
                cb(err);
            });
            result.on('end', function(result) {
                if(!resultFound){
                    cb({"error":"No Result"});
                }
            });
        });
    }
};


module.exports = ldap;