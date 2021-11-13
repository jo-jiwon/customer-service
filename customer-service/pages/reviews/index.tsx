import ReviewStyles from "../../styles/Reviews.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import { Image } from "react-bootstrap";
import { getTimeString } from "../../lib/string";
import { useEffect, useState } from "react";
import { ReviewState } from "../../provider/modules/review";
import { requestFetchNextReviews } from "../../middleware/modules/review";

const Review = () => {
  const review = useSelector((state: RootState) => state.review);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // const [currentPage, setCurrentPage] = useState<number>(0);
  // 컴포넌트가 마운팅되는 시점에 실행
  useEffect(() => {
    if (!review.isFetched) {
      // 서버에서 데이터를 받아오는 action을 디스패치함
      // dispatch(requestFetchReviews());
      dispatch(
        requestFetchNextReviews({
          page: 0,
          size: review.pageSize,
        })
      );
    }
  }, [dispatch, review.isFetched, review.pageSize]);

  return (
    <div className="width700 review-wrap">
      <div className={ReviewStyles.reviewTop}>
        <div className="d-flex ">
          <h2 className="title" style={{ width: "50%" }}>
            시술후기
            <span className="title-bg" />
          </h2>
          <div
            className="d-flex justify-content-end my-auto"
            style={{ width: "50%" }}
          >
            <button
              className="btnSize btn btnBg"
              onClick={() => {
                router.push("/reviews/check");
              }}
            >
              <i className="bi bi-plus-lg me-1"></i>
              시술후기 작성
            </button>
          </div>
        </div>
      </div>
      <div className={ReviewStyles.reviews}>
        {review.data.map((item, index) => (
          <div
            key={`review-item-${index}`}
            className="card d-flex"
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push(`/reviews/detail/${item.id}`);
            }}
          >
            <div className="card-body d-flex">
              <Image
                className="me-3"
                src={item.reviewPhotoUrl}
                alt={item.title}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />

              <div className={ReviewStyles.title} style={{ margin: "auto 0" }}>
                <div className="my-3" style={{ display: "grid" }}>
                  <p
                    className="card-title"
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    {item.title}
                  </p>

                  <p className="card-text">{item.description}</p>
                </div>
                <div style={{ fontSize: "0.85rem", color: "#999" }}>
                  {getTimeString(item.createdTime)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 더보기 페이징 */}
      {!review.isLast && (
        <div className="btn-wrap d-flex justify-content-center">
          <button
            className="btnSize btn btnLine"
            style={{ width: "200px" }}
            onClick={(e) => {
              e.preventDefault(); // 기본 동작 방지
              dispatch(
                requestFetchNextReviews({
                  page: review.page + 1,
                  size: review.pageSize,
                })
              );
              router.push("/reviews");
            }}
          >
            더보기
          </button>
        </div>
      )}
      {/* // 더보기 페이징 */}
    </div>
  );
};

export default Review;
