import reviewReducer, {
  addReview,
  initialCompleted,
  initialNextReview,
  // initialPagedReview,
  initialReview,
  modifyReview,
  removeReview,
  ReviewPage,
} from "../../provider/modules/review";
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ReviewItem } from "../../provider/modules/review";
import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "@redux-saga/core/effects";
import api, {
  ReviewItemRequest,
  ReviewItemResponse,
  ReviewPagingResponse,
} from "../../api/review";
import { AxiosResponse } from "axios";
import { RootState } from "../../provider";
import { addAlert } from "../../provider/modules/alert";

export interface PageRequest {
  page: number;
  size: number;
}

// saga action 생성

// review를 추가하도록 요청하는 액션
// 전체 데이터 조회해서 추가할 때
export const requestAddReview = createAction<ReviewItem>(
  `${reviewReducer.name}/requestAddReview`
);

// 숫자 페이징에서 추가할 때
// export const requestAddReviewPaging = createAction<ReviewItem>(
//   `${reviewReducer.name}/requestAddReviewPaging`
// );

// 더보기 페이징에서 추가할 때
export const requestAddReviewNext = createAction<ReviewItem>(
  `${reviewReducer.name}/requestAddReviewNext`
);

// review를 가져오는 action
export const requestFetchReviews = createAction(
  `${reviewReducer.name}/requestFetchReviews`
);

// review를 페이징으로 가져오는 action
// export const requestFetchPagingReviews = createAction<PageRequest>(
//   `${reviewReducer.name}/requestFetchPagingReviews`
// );

// 다음 페이 review를 가져오는 action
export const requestFetchNextReviews = createAction<PageRequest>(
  `${reviewReducer.name}/requestFetchNextReviews`
);

// photo를 삭제하는 action
export const requestRemoveReview = createAction<number>(
  `${reviewReducer.name}/requestRemoveReview`
);

// photo를 삭제하는 action(숫자 페이징일때)
export const requestRemoveReviewPaging = createAction<number>(
  `${reviewReducer.name}/requestRemoveReviewPaging`
);

// photo를 삭제하는 action(더보기 페이징일때)
export const requestRemoveReviewNext = createAction<number>(
  `${reviewReducer.name}/requestRemoveReviewNext`
);

// photo를 수정하는 action
export const requestModifyReview = createAction<ReviewItem>(
  `${reviewReducer.name}/requestModifyReview`
);

// saga action 처리

// 서버에 post로 데이터를 보내 추가하고, redux state를 변경

// function* addDataPaging(action: PayloadAction<ReviewItem>) {
//   yield console.log("--addDataPaging--");

//   try {
//     // payload 객체
//     const reviewItemPayload = action.payload;

//     // rest api로 보낼 요청객체
//     const reviewItemRequest: ReviewItemRequest = {
//       title: reviewItemPayload.title,
//       // title: "", // 임시로 에러 유발(400)
//       description: reviewItemPayload.description
//         ? reviewItemPayload.description
//         : "",
//       reviewPhotoUrl: reviewItemPayload.reviewPhotoUrl,
//       fileType: reviewItemPayload.fileType,
//       fileName: reviewItemPayload.fileName,
//       clinic: reviewItemPayload.clinic,
//       price: reviewItemPayload.price,
//       keyword: reviewItemPayload.keyword,
//       createdTime: reviewItemPayload.createdTime,
//     };

//     // rest api에 post로 데이터를 보냄
//     const result: AxiosResponse<ReviewItemResponse> = yield call(
//       api.add,
//       reviewItemRequest
//     );

//     // redux state를 변경함
//     // 페이징 처리 추가 로직
//     // 추가하기전에 현재 페이지의 가장 마지막 데이터를 삭제
//     // 예) 시술후기 보여주는 화면이 6개일때 시술후기를 추가하면 7개가 보여짐을 방지
//     const reviewData: ReviewItem[] = yield select(
//       (state: RootState) => state.review.data
//     );
//     // 현재 데이터가 있으면
//     if (reviewData.length > 0) {
//       // 가장 마지막 요소의 id를 가져오고 삭제함(백엔드의 데이터까지 삭제하는 것 아님!!)
//       const deleteId = reviewData[reviewData.length - 1].id;
//       yield put(removeReview(deleteId));
//     }

//     // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
//     const reviewItem: ReviewItem = {
//       id: result.data.id,
//       title: result.data.title,
//       description: result.data.description,
//       reviewPhotoUrl: result.data.reviewPhotoUrl,
//       fileType: result.data.fileType,
//       fileName: result.data.fileName,
//       clinic: result.data.clinic,
//       price: result.data.price,
//       keyword: result.data.keyword,
//       createdTime: result.data.createdTime,
//     };

//     // alert박스를 추가해줌
//     yield put(
//       addAlert({
//         id: nanoid(),
//         variant: "success",
//         message: "시술후기가 등록되었습니다.",
//       })
//     );

//     // dispatcher(액션)과 동일함
//     yield put(addReview(reviewItem));

//     // completed 속성 삭제
//     yield put(initialCompleted());
//   } catch (e: any) {
//     // 에러발생
//     // alert박스를 추가해줌
//     yield put(
//       addAlert({
//         id: nanoid(),
//         variant: "danger",
//         message: "제목을 입력해주세요.",
//       })
//     );
//   }
// }

function* addDataNext(action: PayloadAction<ReviewItem>) {
  yield console.log("--addDataNext--");

  try {
    // payload 객체
    const reviewItemPayload = action.payload;

    // rest api로 보낼 요청객체
    const reviewItemRequest: ReviewItemRequest = {
      title: reviewItemPayload.title,
      // title: "", // 임시로 에러 유발(400)
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
        message: "제목을 입력해주세요.",
      })
    );
  }
}

// 서버에서 GET으로 데이터를 가져오고, redux
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

// 숫자 페이징 목록 조회
// function* fetchPagingData(action: PayloadAction<PageRequest>) {
//   yield console.log("--fetchPagingData--");

//   const page = action.payload.page;
//   const size = action.payload.size;

//   // localStorage.setItem("review_page_size", size.toString());

//   try {
//     // 백엔드에서 데이터 받아오기
//     const result: AxiosResponse<ReviewPagingResponse> = yield call(
//       api.fetchPaging,
//       page,
//       size
//     );

//     // 받아온 페이지 데이터를 payload 변수로 변환
//     const reviewPage: ReviewPage = {
//       // 응답데이터배열을 액션페이로드 배열로 변환
//       data: result.data.content.map(
//         (item) =>
//           ({
//             id: item.id,
//             title: item.title,
//             description: item.description,
//             reviewPhotoUrl: item.reviewPhotoUrl,
//             fileType: item.fileType,
//             fileName: item.fileName,
//             clinic: item.clinic,
//             price: item.price,
//             keyword: item.keyword,
//             createdTime: item.createdTime,
//           } as ReviewItem)
//       ),
//       totalElements: result.data.totalElements,
//       totalPages: result.data.totalPages,
//       page: result.data.number,
//       pageSize: result.data.size,
//       isLast: result.data.last,
//     };

//     // state 초기화 reducer 실행
//     yield put(initialPagedReview(reviewPage));
//   } catch (e: any) {
//     // 에러발생
//     // alert박스를 추가해줌
//     yield put(
//       addAlert({
//         id: nanoid(),
//         variant: "danger",
//         message: e.message,
//       })
//     );
//   }
// }

// 더보기 페이징 목록 조회
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

// 서버에서 DELETE로 데이터 삭제
// function* removeDataPaging(action: PayloadAction<number>) {
//   yield console.log("--removeData--");

//   // id값
//   const id = action.payload;

//   // rest api 연동
//   const result: AxiosResponse<boolean> = yield call(api.remove, id);
//   // 반환값이 true이면
//   if (result.data) {
//     // state 변경(1건삭제)
//     yield put(removeReview(id));
//   } else {
//     // alert박스를 추가해줌
//     yield put(
//       addAlert({
//         id: nanoid(),
//         variant: "danger",
//         message: "오류로 저장되지 않았습니다.",
//       })
//     );
//   }

//   // completed 속성 삭제
//   yield put(initialCompleted());

//   // 현재 페이지 데이터를 다시 가져옴
//   // 현재 페이지와 사이즈 값을 읽어옴
//   const page: number = yield select((state: RootState) => state.review.page);
//   const size: number = yield select(
//     (state: RootState) => state.review.pageSize
//   );
//   yield put(requestFetchPagingReviews({ page, size }));
// }

// 서버에서 DELETE로 데이터 삭제
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

// 서버에서 MODIFY로 데이터 수정
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

// saga action 감지
// review redux state 처리와 관련된 saga action들을 take할 saga생성
export default function* reviewSaga() {
  //
  // 동일한 타입의 액션을 모두 처리함
  yield takeEvery(requestAddReview, addDataNext);
  // yield takeEvery(requestAddReviewPaging, addDataPaging);
  yield takeEvery(requestAddReviewNext, addDataNext);

  // 동일한 타입의 액션중에서 가장 마지막 액션만 처리
  yield takeLatest(requestFetchReviews, fetchData);
  // yield takeLatest(requestFetchPagingReviews, fetchPagingData);
  yield takeLatest(requestFetchNextReviews, fetchNextData);

  // 삭제처리
  yield takeEvery(requestRemoveReview, removeDataNext);
  // yield takeEvery(requestRemoveReviewPaging, removeDataPaging);
  yield takeEvery(requestRemoveReviewNext, removeDataNext);

  // 수정처리
  yield takeEvery(requestModifyReview, modifyData);
}
