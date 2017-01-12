/**
 * Created by osseman on 11/01/17.
 */

import {setEntries, next, vote, INITIAL_STATE} from './core'

//This is a reducer, which takes any state action combination and returns the new state.
//Its praxis to always set a relevant value for an undefined state, here INITIAL_STATE
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type){
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
            return next(state);
        case 'VOTE':
            return state.update('vote',
                voteState => vote(voteState, action.entry));
    }
    return state;
}