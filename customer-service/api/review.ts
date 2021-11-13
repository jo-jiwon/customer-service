import axios from "axios";

export interface ReviewPagingResponse {
  content: ReviewItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// 서버로 부터 받아오는 데이터 1건에 대한 타입
export interface ReviewItemResponse {
  id: number;
  title: string;
  description: string;
  reviewPhotoUrl: string;
  fileType: string;
  fileName: string;
  clinic: string;
  price: string;
  keyword: string;
  createdTime: number;
}

export interface ReviewItemRequest {
  title: string;
  description: string;
  reviewPhotoUrl: string;
  fileType: string;
  fileName: string;
  clinic: string;
  price: string;
  keyword: string;
  createdTime: number;
}

// process.env.변수명
const reviewApi = {
  // axios.get<응답데이터타입>(요청URL);
  // GET 요청URL HTTP/1.1
  fetch: () =>
    axios.get<ReviewItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/reviews`
    ),

  // 페이징으로 GET
  fetchPaging: (page: number, size: number) =>
    axios.get<ReviewPagingResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/reviews/paging?page=${page}$size=${size}`
    ),

  // POST
  add: (reviewItem: ReviewItemRequest) =>
    axios.post<ReviewItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/reviews`,
      reviewItem
    ),

  // DELETE
  remove: (id: number) =>
    axios.delete<boolean>(`${process.env.NEXT_PUBLIC_API_BASE}/reviews/${id}`),

  // // PUT
  modify: (id: number, reviewItem: ReviewItemRequest) =>
    axios.put<ReviewItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/reviews/${id}`,
      reviewItem
    ),
};

export default reviewApi;
