var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) { // todo: app.js 에 있는거랑 맞춰줘야 되나?
  res.render('create_chatroom', {}); // { title: 'This is title' } 이런식으로 데이터 전달.
  // res.send('respond with a resource');  이런식으로도 .... 정확히 뭔지는...?
});


module.exports = router;
