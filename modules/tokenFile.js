var config = require('../config');
var fs = require("fs");

var tokenFile = {
    saveToken: function (time,email,token) {
        var tokens = this._readTokens();
        tokens.push({time : time, email: email, token: token});
        this._writeTokens(tokens);
    },
    findToken: function (token,email) {
        var tokens = this._removeOutdatedTokens(this._readTokens());
        for(var i = 0; i < tokens.length; i++){
            if(tokens[i].token === token && tokens[i].email === email){
                return true;
            }
        }
        return false;
    },
    removeToken: function (token) {
        var tokens = this._readTokens();
        var retTokens = [];
        for(var i = 0; i < tokens.length; i++){
            if(tokens[i].token !== token ){
                retTokens.push(tokens[i]);
            }
        }
        this._writeTokens(retTokens);
    },
    _readTokens: function () {
        var tokens;
        try {
            var content = fs.readFileSync(__dirname+"/.tokens.json");
            tokens = JSON.parse(content);
        }
        catch (e) {
            tokens = [];
        }
        return tokens;
    },
    _writeTokens: function (tokens) {
        fs.writeFile(__dirname+"/.tokens.json", JSON.stringify(tokens), function(err) {
            if(err) {
                return console.log(err);
            }
        });
    },
    _removeOutdatedTokens: function (tokens) {
        var retTokens = [];
        var now = Date.now();
        for(var i = 0; i < tokens.length; i++){
            if((tokens[i].time + (config.user.password.tokenVaildTimeInMinutes * 60 * 1000)) > now ){
                retTokens.push(tokens[i]);
            }
        }
        this._writeTokens(retTokens);
        return retTokens;
    }
};

module.exports = tokenFile;