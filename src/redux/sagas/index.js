import { put, spawn, debounce, takeLatest, call, takeEvery } from 'redux-saga/effects';
import { searchSkillsFailure, searchSkillsRequest, searchSkillsSuccess } from '../slices/search';
import { searchSkills, servicesRequest } from '../api';
import { setItemsError, setItemsSuccess } from '../slices/services';

// search

function* debouncedChangeSearchSaga(action) {
  yield put(searchSkillsRequest(action.payload));
}

function filterChangeSearch({ type }) {
  return type === 'search/changeSearch';
}

function* changeSearchSaga() {
  yield debounce(500, filterChangeSearch, debouncedChangeSearchSaga);
}

function* handleSearchSkillsSaga(action) {
  if (action.payload.trim() !== '') {
    try {
      const data = yield call(searchSkills, action.payload.trim());
      yield put(searchSkillsSuccess(data));
    } catch (e) {
      yield put(searchSkillsFailure(e));
    }
  }
}

function* watchSearchSkillsSaga() {
  yield takeLatest('search/searchSkillsRequest', handleSearchSkillsSaga);
}


// services

function* handleServicesSaga(action) {
  try {
    const data = yield call(servicesRequest, action.payload);
    yield put(setItemsSuccess(data));
  } catch (e) {
    yield put(setItemsError(e));
  }
}

function* watchServicesSaga() {
  yield takeEvery('services/setItems', handleServicesSaga);
}

export default function* saga() {
  yield spawn(changeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
  yield spawn(watchServicesSaga);
}
