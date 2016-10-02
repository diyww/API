var config = {};

config.ldap = {};

config.ldap.server = "ldap://ldap.example.com";
config.ldap.port = 389;
config.ldap.bindUser = 'cn=admin,dc=example,dc=com';
config.ldap.bindPW = 'example';

module.exports = config;