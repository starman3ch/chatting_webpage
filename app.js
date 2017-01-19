var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var create_chatroom = require('./routes/create_chatroom');
var chatroom = require('./routes/chatroom');
var admin_login = require('./routes/admin_login');
var admin_manage = require('./routes/admin_manage');

var app = express();

app.io = require('socket.io')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', index);
app.use('/create_chatroom', create_chatroom);
app.use('/chatroom', chatroom); // todo: should input id
app.use('/admin_login', admin_login);
app.use('/admin_manage', admin_manage);


var connected_people_cnt = 0;
// socket.io
app.io.sockets.on('connection', function(socket) {
  console.log('a user connected.');
  connected_people_cnt += 1;
  app.io.sockets.emit('conn_cnt', { conn_count: connected_people_cnt });

  socket.on('disconnect', function() {
    console.log('user disconnected.');
    connected_people_cnt -= 1;
    app.io.sockets.emit('conn_cnt', { conn_count: connected_people_cnt });
  });

  socket.on('chatmsg', function(data){
    console.log('chat msg| name:'+data.name+', message:'+data.message);
    app.io.sockets.emit('chatmsg', data);
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


console.log('Chatting Server starts!');

module.exports = app;
