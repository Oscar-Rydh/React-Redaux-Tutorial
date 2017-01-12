/**
 * Created by osseman on 11/01/17.
 */
import {List, Map} from 'immutable';

//This file contains the core functions as described by the testes that changes the sate.
//Since we are doing functional programing, we always return a new state by doing some form of changes in our old state.
//This can be seen as we always return the state with some applied function.

export const INITIAL_STATE = Map();

export function setEntries(state, entries){
    entries = List(entries);
    return state.set('entries', entries);
}


function getWinners(vote) {
    if (!vote) return [];
    const [a, b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);
    if      (aVotes > bVotes)  return [a];
    else if (aVotes < bVotes)  return [b];
    else                       return [a, b];
}

export function next(state){
    const entries = state.get('entries').concat(getWinners(state.get('vote')));
    if(entries.size === 1) {
        return state.remove('vote').remove('entries').set('winner', entries.first());
    } else {
        return state.merge({
            vote: Map({pair: entries.take(2)}),
            entries: entries.skip(2)
        });
    }
}

export function vote(voteState, entry) {
    return voteState.updateIn(
        ['tally', entry],
        0,
        tally => tally + 1
    );
}