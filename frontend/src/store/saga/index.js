import {
  takeLeading,
  put,
  spawn,
  call,
  delay,
  select,
} from "redux-saga/effects";
import {
  sendRequestToReceiveNews,
  receiptNewsSuccess,
  sendRequestToReceiveNewsWithLastSeenId,
} from "../slices/newsSlice";
import { getNewsList, getNewsListWithLastSeenId } from "../../api";

function* updateApi({ api, id }) {
  while (true) {
    try {
      const apiResponse = yield call(api, id);
      return apiResponse;
    } catch (error) {
      yield delay(3000);
    }
  }
}

function* handleNewsListSaga() {
  try {
    const data = yield call(updateApi, { api: getNewsList });
    yield put(receiptNewsSuccess(data));
  } catch (e) {}
}

function* handleNewsListWithLastSeenIdSaga() {
  const lastSeenId = yield select((state) => state.news.lastSeenId);

  try {
    const data = yield call(updateApi, {
      api: getNewsListWithLastSeenId,
      id: lastSeenId,
    });
    yield put(receiptNewsSuccess(data));
  } catch (e) {}
}

function* watchNewsListSaga() {
  yield takeLeading(sendRequestToReceiveNews.type, handleNewsListSaga);
}

function* watchNewsListWithLastSeenIdSaga() {
  yield takeLeading(
    sendRequestToReceiveNewsWithLastSeenId.type,
    handleNewsListWithLastSeenIdSaga
  );
}

export default function* saga() {
  yield spawn(watchNewsListSaga);
  yield spawn(watchNewsListWithLastSeenIdSaga);
}
