var config = {};

config.ldap = {};
config.ldap.server = "ldap://ldap.example.com";
config.ldap.port = 389;
config.ldap.bindUser = 'cn=admin,dc=example,dc=com';
config.ldap.bindPW = 'example';

config.smtp = {};
config.smtp.user = "example@example.com";
config.smtp.pw = "example";
config.smtp.server = "mail.example.com";
config.smtp.sender.name = "Example Name";
config.smtp.sender.email = "do-not-replay@example.com";

config.user = {};
config.user.passwordsalt = "exampleSalt";
config.user.password.salt = "ljasdhjkahsd";
config.user.password.tokenVaildTimeInMinutes = 30;
config.user.password.forgetLink = "http://www.example.com/passwordforget/?token=:token";
config.user.password.forgetPlainText = "Hello :name, bla :tokenVaildTimeInMinutes bla :link bla";

module.exports = config;