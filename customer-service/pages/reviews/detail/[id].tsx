import { useRouter } from "next/router";
import "bootstrap-icons/font/bootstrap-icons.json";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";
import { removeReview } from "../../../provider/modules/review";
import { getTimeString } from "../../../lib/string";
import { requestRemoveReviewNext } from "../../../middleware/modules/review";
import { useEffect } from "react";

const ReviewDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const id = router.query.id as string;
  console.log(id);

  const reviewItem = useSelector((state: RootState) =>
    state.review.data.find((item) => item.id === +id)
  );

  // 삭제 여부 감지 및 가져오기
  const isRemoveCompleted = useSelector(
    (state: RootState) => state.review.isRemoveCompleted
  );

  useEffect(() => {
    isRemoveCompleted && router.push("/reviews");
  }, [isRemoveCompleted, router]);

  const handleDeleteClick = () => {
    // 리덕스 action
    // dispatch(removeReview(+id));

    // saga action
    // dispatch(requestRemoveReview(+id)); // 전체 조회일 때
    // dispatch(requestRemoveReviewPaging(+id)); // 숫자 페이징일때
    dispatch(requestRemoveReviewNext(+id)); // 더보기 페이징일때

    // router.push("/reviews");
  };

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
            handleDeleteClick();
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
