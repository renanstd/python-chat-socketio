var protocol = window.location.protocol;
// Para funcionar no heroku, a string de conexão não pode ter porta:
// E o protocolo deve ser HTTPS
var conn_string = protocol + '//' + document.domain;
// Para testes locais, use essa string:
// var conn_string = protocol + '//' + document.domain + ':' + location.port;
var socket = io.connect(conn_string);

socket.on('connect', function() {
    socket.emit('my event', {
        data: 'User connected'
    });
    var form = $('form').on('submit', function(e) {
        e.preventDefault();
        let user_name = $('input.username').val();
        let user_input = $('input.message').val();
        socket.emit('my event', {
            user_name: user_name,
            message: user_input
        });
        $('input.message').val('').focus();
    });
});

socket.on('my response', function(msg) {
    console.log(msg);
    if (typeof msg.user_name !== 'undefined') {
        $('h3').remove();
        $('div.message_holder').append('<div><b>'+msg.user_name+':</b> '+msg.message+'</div>');
    }
});
