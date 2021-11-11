import reviewReducer from "../../provider/modules/review";
import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { ReviewItem } from "../../provider/modules/review";
import { takeEvery } from "@redux-saga/core/effects";

// saga action 생성

// review를 추가하도록 요청하는 액션
export const requestAddReview = createAction<ReviewItem>(
  `${reviewReducer.name}/requestAddReview`
);

// saga action 처리
// 서버에 post로 데이터를 보내 추가하고, redux state를 변경
function* addData(action: PayloadAction<ReviewItem>) {
  yield console.log("--addData--");
  yield console.log(action);

  // payload 객체
  const reviewItemPayload = action.payload;

  // rest api로 보낼 요청객체
}

// saga action 감지
// review redux state 처리와 관련된 saga action들을 take할 saga생성
export default function* reviewSaga() {
  // dispatcher 동일한 타입의 액션을 모두 처리함
  yield takeEvery(requestAddReview, addData);
}
