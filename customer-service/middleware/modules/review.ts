import reviewReducer, {
  addReview,
  initialCompleted,
  initialNextReview,
  initialReview,
  modifyReview,
  removeReview,
  ReviewPage,
} from "../../provider/modules/review";
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ReviewItem } from "../../provider/modules/review";
import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import api, {
  ReviewItemRequest,
  ReviewItemResponse,
  ReviewPagingResponse,
} from "../../api/review";
import { AxiosResponse } from "axios";
import { addAlert } from "../../provider/modules/alert";
import { dataUrlToFile } from "../../lib/string";
import fileApi from "../../api/file";

export interface PageRequest {
  page: number;
  size: number;
}

//-------------------------- saga action 생성

// 데이터 추가하는 액션(전체)
export const requestAddReview = createAction<ReviewItem>(
  `${reviewReducer.name}/requestAddReview`
);

// 데이터 추가하는 액션(더보기)
export const requestAddReviewNext = createAction<ReviewItem>(
  `${reviewReducer.name}/requestAddReviewNext`
);

// review를 가져오는 action
export const requestFetchReviews = createAction(
  `${reviewReducer.name}/requestFetchReviews`
);

// review를 가져오는 action(더보기)
export const requestFetchNextReviews = createAction<PageRequest>(
  `${reviewReducer.name}/requestFetchNextReviews`
);

// review를 삭제하는 action
export const requestRemoveReview = createAction<number>(
  `${reviewReducer.name}/requestRemoveReview`
);

// review를 삭제하는 action(더보기)
export const requestRemoveReviewNext = createAction<number>(
  `${reviewReducer.name}/requestRemoveReviewNext`
);

// review를 수정하는 action
export const requestModifyReview = createAction<ReviewItem>(
  `${reviewReducer.name}/requestModifyReview`
);

//-------------------------- saga action 처리

// 서버에 post로 데이터를 보내 추가하고, redux state를 변경
function* addDataNext(action: PayloadAction<ReviewItem>) {
  yield console.log("--addDataNext--");

  try {
    // payload 객체
    const reviewItemPayload = action.payload;

    // s3업로드 처리
    // 1. dataurl -> file 변환
    const file: File = yield call(
      dataUrlToFile,
      reviewItemPayload.reviewPhotoUrl,
      reviewItemPayload.fileName,
      reviewItemPayload.fileType
    );

    // 2. form data 객체 생성
    const formFile = new FormData();
    formFile.set("file", file);

    // 3. multipart/form-data로 업로드
    const fileUrl: AxiosResponse<string> = yield call(fileApi.upload, formFile);

    // rest api로 보낼 요청객체
    const reviewItemRequest: ReviewItemRequest = {
      title: reviewItemPayload.title,
      description: reviewItemPayload.description
        ? reviewItemPayload.description
        : "",
      reviewPhotoUrl: fileUrl.data,
      fileType: reviewItemPayload.fileType,
      fileName: reviewItemPayload.fileName,
      clinic: reviewItemPayload.clinic,
      price: reviewItemPayload.price,
      keyword: reviewItemPayload.keyword,
      createdTime: reviewItemPayload.createdTime,
    };

    // rest api에 post로 데이터를 보냄
    const result: AxiosResponse<ReviewItemResponse> = yield call(
      api.add,
      reviewItemRequest
    );

    // redux state를 변경함
    // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
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

    // alert박스를 추가해줌
    yield put(
      addAlert({
        id: nanoid(),
        variant: "success",
        message: "시술후기가 등록되었습니다.",
      })
    );

    // dispatcher(액션)과 동일함
    yield put(addReview(reviewItem));

    // completed 속성 삭제
    yield put(initialCompleted());
  } catch (e: any) {
    // 에러발생
    // alert박스를 추가해줌
    yield put(
      addAlert({
        id: nanoid(),
        variant: "danger",
        message: "빈칸 없이 작성해주세요.",
      })
    );
  }
}

// 서버에서 목록 조회(전체)
function* fetchData() {
  yield console.log("--fetchData--");

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
        keyword: item.keyword,
        createdTime: item.createdTime,
      } as ReviewItem)
  );
  // state 초기화 reducer 실행
  yield put(initialReview(reviews));
}

// 서버에서 목록 조회(더보기)
function* fetchNextData(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchNextData--");

  const page = action.payload.page;
  const size = action.payload.size;

  localStorage.setItem("review_page_size", size.toString());

  try {
    // 백엔드에서 데이터 받아오기
    const result: AxiosResponse<ReviewPagingResponse> = yield call(
      api.fetchPaging,
      page,
      size
    );

    // 받아온 페이지 데이터를 payload 변수로 변환
    const reviewPage: ReviewPage = {
      // 응답데이터배열을 액션페이로드 배열로 변환
      data: result.data.content.map(
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
            keyword: item.keyword,
            createdTime: item.createdTime,
          } as ReviewItem)
      ),
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      page: result.data.number,
      pageSize: result.data.size,
      isLast: result.data.last,
    };

    // state 초기화 reducer 실행
    yield put(initialNextReview(reviewPage));
  } catch (e: any) {
    // 에러발생
    // alert박스를 추가해줌
    yield put(
      addAlert({
        id: nanoid(),
        variant: "danger",
        message: e.message,
      })
    );
  }
}

// 서버에서 데이터 삭제
function* removeDataNext(action: PayloadAction<number>) {
  yield console.log("--removeDataNext--");

  // id값
  const id = action.payload;

  // rest api 연동
  const result: AxiosResponse<boolean> = yield call(api.remove, id);
  // 반환값이 true이면
  if (result.data) {
    // state 변경(1건삭제)
    yield put(removeReview(id));
  } else {
    // alert박스를 추가해줌
    yield put(
      addAlert({
        id: nanoid(),
        variant: "danger",
        message: "오류로 저장되지 않았습니다.",
      })
    );
  }

  // completed 속성 삭제
  yield put(initialCompleted());
}

// 서버에서 데이터 수정
function* modifyData(action: PayloadAction<ReviewItem>) {
  yield console.log("--modifyData--");

  // action의 payload로 넘어온 객체
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
    clinic: reviewItemPayload.clinic,
    price: reviewItemPayload.price,
    keyword: reviewItemPayload.keyword,
    createdTime: reviewItemPayload.createdTime,
  };

  const result: AxiosResponse<ReviewItemResponse> = yield call(
    api.modify,
    reviewItemPayload.id,
    reviewItemRequest
  );

  // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
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

  // state 변경
  yield put(modifyReview(reviewItem));

  // completed 속성 삭제
  yield put(initialCompleted());
}

//-------------------------- saga action 감지

// redux state 처리와 관련된 saga action들을 take(감지)할 saga생성
export default function* reviewSaga() {
  // 추가 처리
  yield takeEvery(requestAddReview, addDataNext);
  yield takeEvery(requestAddReviewNext, addDataNext);

  // 조회 처리
  yield takeLatest(requestFetchReviews, fetchData);
  yield takeLatest(requestFetchNextReviews, fetchNextData);

  // 삭제처리
  yield takeEvery(requestRemoveReview, removeDataNext);
  yield takeEvery(requestRemoveReviewNext, removeDataNext);

  // 수정처리
  yield takeEvery(requestModifyReview, modifyData);
}
