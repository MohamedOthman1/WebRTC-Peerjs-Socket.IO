
    var socket = io.connect('https://chatserver2019.herokuapp.com/');
    var $msgFrom = $('#From');
    var $msg = $('#message');
    var $chat = $('#chat');
    var $msgArea = $('#msgArea');
    var $userArea = $('#userArea');
    var $user = $('#user');
    var $users = $('#users');
    var $username = $('#username');
    var feedback = $('#feedback');

    $msgFrom.submit(function(e) {
      e.preventDefault();
      socket.emit('Send Message', $msg.val());
      $msg.val('');
    });

    socket.on('new message', function(data) {
      feedback.html('');
      $chat.append(
        '<div class="well" style="max-width:950px;"><strong>' +
          data.user +
          '</strong>: ' +
          data.msg +
          '</div>'
      );
    });

    $user.submit(function (e) {
      e.preventDefault();
      socket.emit('new user', $username.val(), function (data) {
        if (data) {
          $userArea.hide();
          $msgArea.show();
        }
        else {
          console.log("error is here");
          $('#error-message').html('This username already exists.');
        }
      });
      $username.val('');
    });

    socket.on('get users', function(data) {
      var html = '';
      for (i = 0; i < data.length; i++) {
        html += '<li style="color:#000000;font-weight: bold;"> <i class="fa fa-circle" style="color: #00FF00;"></i> ' + data[i] + '</li>';
      }
      $users.html(html);
    });

    $msg.bind('keypress', () => {
      socket.emit('typing');
    });

    socket.on('typing', function(data) {
      feedback.html(
        '<div class="card card-body bg-light"><strong>' +
          data.username +
          '</strong> is typing a message...</div>'
      );
    });