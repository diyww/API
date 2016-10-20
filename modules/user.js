var config = require('../config');
var crypto = require('crypto');
var tokenFile = require('./tokenFile');
var ldap = require('./ldap');

var user = {
    createPasswordToken: function (email) {
        var now = Date.now();
        var token = crypto.createHmac('sha256', config.user.password.salt)
                        .update(now + email)
                        .digest('hex');
        tokenFile.saveToken(now,email,token);
        return token;
    },
    resetPassword: function (email,password,token,callback){
        if(tokenFile.findToken(token,email)){
            tokenFile.removeToken(token);
            ldap.replacePassword(email,password,function (err,res) {
                if(err){
                    console.log(err);
                }
                callback(false,res);
            })
        }
        else{
            callback(true,"Token invalid");
        }
    }
};

module.exports = user;