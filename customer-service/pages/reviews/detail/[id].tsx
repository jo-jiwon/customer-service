import router, { useRouter } from "next/router";
import Layout from "../../../components/layout";
import ReviewStyles from "../../../styles/Reviews.module.css";
import "bootstrap-icons/font/bootstrap-icons.json";
import { GetServerSideProps } from "next";
import context from "react-bootstrap/esm/AccordionContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";
import { removeReview } from "../../../provider/modules/review";
import { getTimeString } from "../../../lib/string";

// interface ReviewData {
//   id: number;
//   title: string;
//   description?: string;
//   reviewPhotoUrl: string;
//   clinic: string;
//   price: string;
//   keyword: string;
// }

// interface DetailProp {
//   review: ReviewData;
// }

const ReviewDetail = () => {
  const router = useRouter();

  const id = router.query.id as string;
  // console.log(id);

  let reviewItem = useSelector((state: RootState) =>
    state.review.data.find((item) => item.id === +id)
  );

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="width700">
      <h2 className="title text-center">시술후기 상세보기</h2>
      {!reviewItem && (
        <div className="text-center my-5">데이터가 없습니다.</div>
      )}
      {reviewItem && (
        <table className="table">
          <tbody>
            <tr>
              <th>작성날짜</th>
              <td>{getTimeString(reviewItem.createdTime)}</td>
            </tr>
            <tr>
              <th>제목</th>

              <td>{reviewItem.title}</td>
            </tr>
            <tr>
              <th>시술사진</th>
              <td>
                <img
                  src={reviewItem.reviewPhotoUrl}
                  alt={reviewItem.title}
                  width={"100%"}
                  style={{ height: "300px", objectFit: "contain" }}
                />
              </td>
            </tr>
            <tr>
              <th>시술키워드</th>
              <td>{reviewItem.keyword}</td>
            </tr>
            <tr>
              <th>후기내용</th>

              <td>{reviewItem.description}</td>
            </tr>
            <tr>
              <th>병원명</th>

              <td>{reviewItem.clinic}</td>
            </tr>
            <tr>
              <th>시술비용</th>

              <td>{reviewItem.price}만원</td>
            </tr>
          </tbody>
        </table>
      )}

      <div className="btn-wrap d-flex justify-content-center">
        <button
          className="btnSize btn btnBg me-1"
          onClick={() => {
            router.push(`/reviews/edit/${id}`);
          }}
        >
          수정하기
        </button>
        <button
          className="btnSize btn btnLine"
          onClick={() => {
            dispatch(removeReview(+id));
            router.push("/reviews");
          }}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const id = context.params?.id;

//   const res = await axios.get<ReviewData[]>(`/review/detail/${id}`);
//   const review = res.data;

//   return { props: { review } };
// };

export default ReviewDetail;
