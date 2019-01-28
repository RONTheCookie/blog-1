var fs = require('fs');

exports.EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
exports.PORT = process.env.PORT || 3000;
exports.JWT_PRIVATE = fs.readFileSync('jwt.key').toString();
exports.API_BASE = process.env.API_BASE || `http://localhost:${exports.PORT}`;
exports.HTML_BASE = process.env.HTML_BASE || `http://localhost:3002`;