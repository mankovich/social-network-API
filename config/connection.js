const { connect, connection } = require('mongoose');

connect('mongodb://127.0.0.1:27017/socNetDB', { useNewUrlParser: true }); 

/* FIXME: (maybe)...don't forget about this if I run into connection issues and it turns out I was just being ignorant */

module.exports = connection;