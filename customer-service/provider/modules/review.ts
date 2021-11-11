import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { events } from "../../common/data";
import { CheckItem } from "./check";

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

// state 타입
export interface ReviewState {
  data: ReviewItem[]; // 리뷰 아이템 배열
  isFetched: boolean; // 서버에서 데이터를 받아온지에 대한 정보
}

const initialState: ReviewState = {
  data: [
    {
      id: 3,
      title: "눈성형",
      description: "눈성형짱잘됨",
      reviewPhotoUrl: "https://via.placeholder.com/150/54176f",
      fileType: "image/jpeg",
      fileName: "placeholder",
      clinic: "아이웰",
      price: "97만원",
      keyword: "눈",
      createdTime: new Date().getTime(),
    },
    {
      id: 2,
      title: "눈성형",
      description: "눈성형짱잘됨",
      reviewPhotoUrl: "https://via.placeholder.com/150/54176f",
      fileType: "image/jpeg",
      fileName: "placeholder",
      clinic: "아이웰",
      price: "97만원",
      keyword: "눈",
      createdTime: new Date().getTime(),
    },
    {
      id: 1,
      title: "눈성형",
      description: "눈성형짱잘됨",
      reviewPhotoUrl: "https://via.placeholder.com/150/54176f",
      fileType: "image/jpeg",
      fileName: "placeholder",
      clinic: "아이웰",
      price: "97만원",
      keyword: "눈",
      createdTime: new Date().getTime(),
    },
  ],
  isFetched: false,
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
      state.data.unshift(review);
      //   state.isAddCompleted = true; // 추가가 되었음으로 표시
    },
    removeReview: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
      // state.isRemoveCompleted=true; // 삭제 되었음을 표시
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
      }
      // state.isModifyCompleted = true; // 변경되었음을 표시
    },
  },
});

export const { addReview, removeReview, modifyReview } = reviewSlice.actions;

export default reviewSlice.reducer;
