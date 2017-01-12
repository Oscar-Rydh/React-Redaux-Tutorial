/**
 * Created by osseman on 12/01/17.
 */
import {createStore} from 'redux';
import reducer from './reducer';

//This is a redux store which contains the state of the app.

export default function makestore(){
    return createStore(reducer);
}