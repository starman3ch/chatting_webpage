var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) { // todo: app.js 에 있는거랑 맞춰줘야 되나?
  res.render('admin_manage', {});
});


module.exports = router;
