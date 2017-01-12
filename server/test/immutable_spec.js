/**
 * Created by osseman on 11/01/17.
 */
import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {

    describe('a number', () => {

        function increment(currentState) {
            return currentState + 1;
        }

        it('is immutable', () => {
            let state = 42;
            let next_state = increment(state);

            expect(next_state).to.equal(43);
            expect(state).to.equal(42);
        });

    });

    describe('A List', () => {

        function addMovie(currentState, movie){
            return currentState.update('movies', movies => movies.push(movie));
        }

        it('is immutable', () => {
            let state = Map({movies: List.of('Trainspotting', '28 Days Later')});
            let next_state = addMovie(state, 'Sunshine');

            expect(next_state).to.equal(Map({movies: List.of(
                'Trainspotting',
                '28 Days Later',
                'Sunshine'
            )}))
            expect(state).to.equal(Map({movies: List.of(
                'Trainspotting',
                '28 Days Later'
            )}));
        });
    });

});