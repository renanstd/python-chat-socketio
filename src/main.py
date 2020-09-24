from flask import Flask, render_template
from flask_socketio import SocketIO


app = Flask(__name__)
app.config['SECRET_KEY'] = 'QWER!@#$'
socketio = SocketIO(app)

@app.route('/')
def sessions():
    return render_template('session.html')

def messaged_received(methods=['GET', 'POST']):
    print('message received!')

@socketio.on('my event')
def handle_custom_event(json, methods=['GET', 'POST']):
    print('received event: ' + str(json))
    socketio.emit('my response', json, callback=messaged_received)


if __name__ == "__main__":
    socketio.run(app, debug=True)
