
//DETAILS FOR SERVER

exports.server = {
    "port": 8080,
}


//DETAILS FOR DATABASE

var DBName = 'kinco';
var devDBPort = 27017;
var devDBHost = `mongodb://localhost:${devDBPort}/${DBName}`;

exports.db = {
    "name": DBName,
    "host": devDBHost,
};

//DETAILS FOR JWT

exports.jwt = {
    "key": "MY@!@Class35353iooi"
}
