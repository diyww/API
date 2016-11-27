var express = require('express');
var router = express.Router();
var config = require('../config');
var mail = require('../modules/mail');
var user = require('../modules/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST Password forget */
router.post('/passwordforget', function(req, res, next) {
    var email = req.body.email;
    console.log(req.body);
    console.log("User " + email + " passwortforget")
    user.getUserByMail(email,function (err,userdata) {
        if(err){
            res.send(err);
            return false;
        }

        var token = user.createPasswordToken(email);
        var link = config.user.password.forgetLink.replace(":token",token).replace(":email",email);
        var plaintext = config.user.password.forgetPlainText.replace(":link",link).replace(":link",link).replace(":name",userdata.givenName).replace(":username",userdata.uid);
        var htmltext = config.user.password.forgetHTMLText.replace(":link",link).replace(":name",userdata.givenName).replace(":username",userdata.uid);

        mail.sendMail(userdata.mail,config.user.password.forgetPasswordSubject,plaintext,htmltext);

        res.send({result: "Send Mail Succes"});
    });


});

/* POST Password forget */
router.post('/passwordreset', function(req, res, next) {
  var email = req.body.email;
  var token = req.body.token;
  var password = req.body.password;

  user.resetPassword(email,password,token,function (err,result) {
      if(err){
          res.send({"error":result});
      }
      else{
          res.send({"success":result})
      }
  });


  //console.log(req.body.email);
});


module.exports = router;
