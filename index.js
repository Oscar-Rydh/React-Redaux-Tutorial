/**
 * Created by osseman on 12/01/17.
 */
import makeStore from './src/store';
import startServer from './src/server';

//This is the entry point for the app
export const store = makeStore();
startServer(store);

//Initializing with the data found in entries.json
store.dispatch({
    type: 'SET_ENTRIES',
    entries: require('./entries.json')
});
//Start the voting
store.dispatch({type: 'NEXT'});