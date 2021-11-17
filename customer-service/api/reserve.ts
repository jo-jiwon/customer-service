import axios from "axios";

export interface ReserveItemResponse {
  id: number;
  rezName: string;
  rezPhone: string;
  seeDate: string;
  seeTime: string;
  eventId?: number;
}

export interface ReserveItemRequest {
  rezName: string;
  rezPhone: string;
  seeDate: string;
  seeTime: string;
  eventId?: number;
}

// process.env.변수명
const reserveApi = {
  get: (id: number) =>
    axios.get<ReserveItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/reserve/${id}`
    ),

  fetch: () =>
    axios.get<ReserveItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/event/complete`
    ),

  add: (reserveItem: ReserveItemRequest) =>
    axios.post<ReserveItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/reserves`,
      reserveItem
    ),
};

export default reserveApi;
