const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.sendFile(path.join(__dirname + '/index.html'));
});

module.exports = router;
