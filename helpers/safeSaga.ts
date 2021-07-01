import { call } from 'redux-saga/effects';
import { errorHandler } from './httpHelpers';

export default function safeSaga(func: any, actionType: string, customMessage?: string | boolean) {
  return function* (args: any) {
    try {
      yield* func(args);
    } catch (err) {
      yield call(errorHandler, err, actionType, customMessage);
    }
  };
}
