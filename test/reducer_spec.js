/**
 * Created by osseman on 11/01/17.
 */
import {expect} from 'chai';
import {fromJS, Map} from 'immutable';

import reducer from '../src/reducer';

describe('A reducer', () => {

    it('handle SET_ENTRIES', () => {
        const state = Map();
        const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']}
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({entries: ['Trainspotting']}))
    });

    it('handle NEXT', () => {
        const state = fromJS({
            entries: ['Trainspotting', '28 Days Later']
        })
        const action = {type: 'NEXT'};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        }));
    });

    it('handle VOTE', () => {
        const state = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        });
        const action = {type: 'VOTE', entry: 'Trainspotting'}
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {
                    'Trainspotting': 1
                }
            },
            entries: []
        }));
    });

    it('Has an inital state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']}
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });

    it('can be used with reduce', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Trainspotting'},
            {type: 'VOTE', entry: '28 Days Later'},
            {type: 'VOTE', entry: 'Trainspotting'},
            {type: 'NEXT'}
        ];
        const finalState = actions.reduce(reducer, Map());

        expect(finalState).to.equal(fromJS({
            winner: 'Trainspotting'
        }));
    });

});