/**
 * Created by osseman on 12/01/17.
 */
import Server from 'socket.io';

export default function startSever(store){
    //Creates a socket.io Server on port 8090
    const io = new Server().attach(8090);

    //Creates a listner to the store which runs the arrow function when changes are made.
    //Here we send a json representation of the full state in the store.
    store.subscribe(() => io.emit('state', store.getState().toJS()));

    //We also want the clients to get a snapshoot of the state when connecting.
    //This is done by listening to the connection event emited på socket.io
    //We also want to handle incoming actions from our clients. This is done by letting clients emit action events.
    //Note that we let any connection send any action to our store!!
    io.on('connection', (store) => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    });
}