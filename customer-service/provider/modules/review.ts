import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// redux store(리덕스 저장소)에 하나의 state를 관리하고 처리할 수 있는 모듈
// slice에는  state와 reducer가 있음
// reducer는 state르 변경하는 함수

export interface ReviewItem {
  id: number;
  title: string;
  description?: string;
  reviewPhotoUrl: string;
  fileType: string;
  fileName: string;
  clinic: string;
  price: string;
  keyword: string;
  createdTime: number;
}

export interface ReviewPage {
  data: ReviewItem[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
}

// state 타입
export interface ReviewState {
  data: ReviewItem[]; // 리뷰 아이템 배열
  isFetched: boolean; // 서버에서 데이터를 받아온지에 대한 정보
  isAddCompleted?: boolean; // 데이터 추가가 완료되었는지 여부
  isRemoveCompleted?: boolean; // 데이터 삭제가 완료되었는지 여부
  isModifyCompleted?: boolean; // 데이터 수정이 완료되었는지 여부
  totalElements?: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast?: boolean;
}

// const reviewPageSize = localStorage.getItem("review_page_size");

const initialState: ReviewState = {
  data: [],
  isFetched: false,
  page: 0,
  // pageSize: reviewPageSize ? +reviewPageSize : 6,
  pageSize: 2,
  totalPages: 0,
};

// slice 생성
const reviewSlice = createSlice({
  name: "review", // slice의 이름(state이름)
  initialState, // 이 slice의 state 초기값
  reducers: {
    // // PayloadAction<payload타입>
    // // Payload로 item객체를 받음
    addReview: (state, action: PayloadAction<ReviewItem>) => {
      const review = action.payload;
      console.log(review);
      state.data.unshift(review);
      state.isAddCompleted = true; // 추가가 되었음으로 표시
    },
    // payload 없는 reducer
    // completed 관련된 속성을 삭제함(undefined 상태)
    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },

    removeReview: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
      state.isRemoveCompleted = true; // 삭제 되었음을 표시
    },
    modifyReview: (state, action: PayloadAction<ReviewItem>) => {
      // 생성해서 넘긴 객체
      const modifyItem = action.payload;
      // state에 있는 객체
      const reviewItem = state.data.find((item) => item.id === modifyItem.id);
      // state에 있는 객체의 속성을 넘김 객체의 속성으로 변경
      if (reviewItem) {
        reviewItem.title = modifyItem.title;
        reviewItem.description = modifyItem.description;
        reviewItem.reviewPhotoUrl = modifyItem.reviewPhotoUrl;
        reviewItem.fileName = modifyItem.fileName;
        reviewItem.fileType = modifyItem.fileType;
      }
      state.isModifyCompleted = true; // 변경되었음을 표시
    },
    // initialPhotoItem: (state, action: PayloadAction<ReviewItem>) => {
    //   const photo = action.payload;
    //   // 백엔드에서 받아온 데이터
    //   state.data = [{ ...photo }];
    // },
    // payload값으로 state를 초기화하는 reducer 필요함
    initialReview: (state, action: PayloadAction<ReviewItem[]>) => {
      const reviews = action.payload;
      //   // 백엔드에서 받아온 데이터
      state.data = reviews;
      //   // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
    // addTotalpages: (state) => {
    //   state.totalPages++;
    // },
    // 숫자 페이징
    initialPagedReview: (state, action: PayloadAction<ReviewPage>) => {
      //   // 백엔드에서 받아온 데이터
      //   // 컨텐트
      state.data = action.payload.data;
      //   // 페이징 데이터
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      //   // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
    // 더보기 페이징
    initialNextReview: (state, action: PayloadAction<ReviewPage>) => {
      //   // 백엔드에서 받아온 데이터를 기존데이터 뒤로 합침
      //   // 컨텐트
      state.data = state.data.concat(action.payload.data);
      //   // 페이징 데이터
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      //   // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
  },
});

export const {
  addReview,
  removeReview,
  modifyReview,
  initialCompleted,
  initialReview,
  initialPagedReview,
  initialNextReview,
} = reviewSlice.actions;

export default reviewSlice.reducer;
