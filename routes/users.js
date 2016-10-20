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

  var token = user.createPasswordToken(email);
  var link = config.user.password.forgetLink.replace(":token",token);
  var plaintext = config.user.password.forgetPlainText.replace(":link",link).replace(":name","HORST");

  mail.sendMail(email,"PW",plaintext,"<b>"+plaintext+"</b>");

  res.send(email);
  console.log(req.body.email);
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
