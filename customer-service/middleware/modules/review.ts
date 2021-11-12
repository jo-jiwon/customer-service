import reviewReducer, {
  addReview,
  initialReview,
} from "../../provider/modules/review";
import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { ReviewItem } from "../../provider/modules/review";
import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import api, { ReviewItemRequest, ReviewItemResponse } from "../../api/review";
import { AxiosResponse } from "axios";

// saga action 생성

// review를 추가하도록 요청하는 액션
export const requestAddReview = createAction<ReviewItem>(
  `${reviewReducer.name}/requestAddReview`
);

// review를 가져오는 action
export const requestFetchReviews = createAction(
  `${reviewReducer.name}/requestFetchReviews`
);

// saga action 처리
// 서버에 post로 데이터를 보내 추가하고, redux state를 변경
function* addData(action: PayloadAction<ReviewItem>) {
  yield console.log("--addData--");
  yield console.log(action);

  // payload 객체
  const reviewItemPayload = action.payload;

  // rest api로 보낼 요청객체
  const reviewItemRequest: ReviewItemRequest = {
    title: reviewItemPayload.title,
    description: reviewItemPayload.description
      ? reviewItemPayload.description
      : "",
    reviewPhotoUrl: reviewItemPayload.reviewPhotoUrl,
    fileType: reviewItemPayload.fileType,
    fileName: reviewItemPayload.fileName,
  };

  // rest api에 post로 데이터를 보냄
  const result: AxiosResponse<ReviewItemResponse> = yield call(
    api.add,
    reviewItemRequest
  );

  const reviewItem: ReviewItem = {
    id: result.data.id,
    title: result.data.title,
    description: result.data.description,
    reviewPhotoUrl: result.data.reviewPhotoUrl,
    fileType: result.data.fileType,
    fileName: result.data.fileName,
    clinic: result.data.clinic,
    price: result.data.price,
    keyword: result.data.keyword,
    createdTime: result.data.createdTime,
  };

  // dispatcher(액션)과 동일함
  yield put(addReview(reviewItem));
}

// 서버에서 GET으로 데이터를 가져오고, redux
function* fetchData() {
  // 백엔드에서 데이터 받아오기
  const result: AxiosResponse<ReviewItemResponse[]> = yield call(api.fetch);

  // 응답데이터배열을 액션페이로드 배열로 변환
  const reviews = result.data.map(
    (item) =>
      ({
        id: item.id,
        title: item.title,
        description: item.description,
        reviewPhotoUrl: item.reviewPhotoUrl,
        fileType: item.fileType,
        fileName: item.fileName,
        clinic: item.clinic,
        price: item.price,
        createdTime: item.createdTime,
      } as ReviewItem)
  );
  // state 초기화 reducer 실행
  yield put(initialReview(reviews));
}

// saga action 감지
// review redux state 처리와 관련된 saga action들을 take할 saga생성
export default function* reviewSaga() {
  //
  // 동일한 타입의 액션을 모두 처리함
  yield takeEvery(requestAddReview, addData);

  // 동일한 타입의 액션중에서 가장 마지막 액션만 처리
  yield takeLatest(requestFetchReviews, fetchData);
}
