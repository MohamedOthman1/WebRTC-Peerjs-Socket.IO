const io = require('socket.io')(process.env.PORT || 3000);

const arrUserInfo = [];

io.on('connection', socket => {
    socket.on('user registration', user => {
        const isExist = arrUserInfo.some(e => e.ten === user.ten);
        socket.peerId = user.peerId;
        if (isExist) return socket.emit('REGISTRATION');
        arrUserInfo.push(user);
        socket.emit('online policy', arrUserInfo);
        socket.broadcast.emit('new user', user);
    });

    socket.on('disconnect', () => {
        const index = arrUserInfo.findIndex(user => user.peerId === socket.peerId);
        arrUserInfo.splice(index, 1);
        io.emit('disconnect', socket.peerId);
    });
});
