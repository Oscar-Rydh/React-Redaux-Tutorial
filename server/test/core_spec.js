/**
 * Created by osseman on 11/01/17.
 */
import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

    describe('setEntries', () => {

        it('adds entries to a state', () => {
            const state = Map();
            const entries = ['Trainspotting', '28 Days Later'];
            const nextState = setEntries(state, entries);

            expect(state).to.equal(Map());
            expect(nextState).to.equal(Map({entries: List.of('Trainspotting', '28 Days Later')}));
        });
    });

    describe('next', () => {
        it('takes the entries and creates a new state with the votes and remaining entries', () => {
            const state = Map({entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')});
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({pair: List.of('Trainspotting', '28 Days Later')}),
                entries: List.of('Sunshine')
            }))
        });

        it('puts back the winner of a vote into the entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting' : 5,
                        '28 Days Later': 3
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Days')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Days', 'Trainspotting')
            }));
        });

        it('puts back both entries when equal ammount of votes', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 3
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Days')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Days', 'Trainspotting', '28 Days Later')
            }))
        });

        it('marks a winner when only one entry remains', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 5,
                        '28 Days Later': 3
                    })
                }),
                entries: List()
            })
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                winner: 'Trainspotting'
            }))
        })

    })

    describe('vote', () => {

        it('creates a tally for the voted entry', () => {
            const state = Map({
                pair: List.of('Trainspotting', '28 Days Later')
            });
            const nextState = vote(state, 'Trainspotting')
            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 1
                })
            }));
        });

        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 3,
                    '28 Days Later': 2
                })
            });
            const nextState = vote(state, 'Trainspotting');
            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 4,
                    '28 Days Later': 2
                })
            }));
        });

    })


})