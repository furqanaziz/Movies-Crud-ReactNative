import moviesaga from './saga';
import {all } from 'redux-saga/effects';

export default function* rootsaga(){
yield all([
    moviesaga()
]);
}