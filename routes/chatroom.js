var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) { // todo: app.js 에 있는거랑 맞춰줘야 되나?
  var room_id = req.params.id;
  res.render('chatroom', {
    title: 'ChatRoom',
    room_id: room_id
  });
});


module.exports = router;
