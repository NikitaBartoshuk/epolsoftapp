'use strict'

const fs = require('fs');
const path =('path');
var db = require("./database.js");
const config = ('./config')

const Client = require('ssh2-sftp-client');
let sftp = new Client();

sftp.connect({
    host: 'my-direction-server',
    port: 22,
    username: 'user',
    password: 'password'
}).then(() => {
    return sftp.list('/path/to/my/files');
}).then((data) => {

    for(let i = 0; i < data.length; i++) {
        const remoteFilename = '/path/to/remote/files/' + data[i].name;
        const localFilename = '/path/to/local/files/' + data[i].name;
        sftp.get(remoteFilename).then((stream) => {
            stream.pipe(fs.createWriteStream(localFilename));
        })
    }
}).catch((err) => {
    console.log(err, 'catch error');
});

