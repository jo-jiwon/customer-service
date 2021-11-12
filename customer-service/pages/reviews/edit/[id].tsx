import { useRouter } from "next/router";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/layout";
import { AppDispatch, RootState } from "../../../provider";
import { modifyReview, ReviewItem } from "../../../provider/modules/review";
import ReviewStyles from "../../../styles/Reviews.module.css";

const ReviewEdit = () => {
  const router = useRouter();

  const id = router.query.id as string;

  const reviewItem = useSelector((state: RootState) =>
    state.review.data.find((item) => item.id === +id)
  );

  const dispatch = useDispatch<AppDispatch>();

  const [url, setUrl] = useState<string | undefined>(
    reviewItem?.reviewPhotoUrl
  );

  const descTxta = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const titleInput = useRef<HTMLInputElement>(null);

  const changeFile = () => {
    if (fileInput.current?.files?.length) {
      const imageFile = fileInput.current.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setUrl(reader.result?.toString());
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleSaveClick = () => {
    if (fileInput.current?.files?.length) {
      const imageFile = fileInput.current.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reviewItem) {
          // 기존데이터 카피
          const item = { ...reviewItem };
          // 변경할 속성만 대입
          item.title = titleInput.current ? titleInput.current.value : "";
          item.description = descTxta.current?.value;
          item.reviewPhotoUrl = reader.result ? reader.result.toString() : "";

          // reducer로 state 수정 및 목록으로 이동
          saveItem(item);
        }
      };
      reader.readAsDataURL(imageFile);
    } else {
      if (reviewItem) {
        // 기존데이터 카피
        const item = { ...reviewItem };
        // 변경할 속성만 대입
        item.title = titleInput.current ? titleInput.current.value : "";
        item.description = descTxta.current?.value;

        // reducer로 state 수정 및 목록으로 이동
        saveItem(item);
      }
    }
  };
  const saveItem = (item: ReviewItem) => {
    dispatch(modifyReview(item));
    router.push("/reviews");
  };
  return (
    <div className="width700">
      <h2 className="title text-center">시술후기 수정하기</h2>
      {/* {!photoItem && (
           <div className="text-center my-5">데이터가 없습니다.</div>
         )} */}
      {/* {photoItem && ( */}
      <table className="table">
        <tbody>
          <tr>
            <th> 제목</th>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={reviewItem?.title}
                ref={titleInput}
              />
            </td>
          </tr>
          <tr>
            <th>시술사진</th>
            <td>
              <img
                src={url}
                alt={reviewItem?.title}
                width={"100%"}
                style={{ height: "300px", objectFit: "contain" }}
              />
              <input
                className="form-control"
                type="file"
                accept="image/*"
                style={{ height: "33px", marginTop: "1rem" }}
                ref={fileInput}
                onChange={() => {
                  changeFile();
                }}
              />
            </td>
          </tr>

          <tr>
            <th>후기내용</th>
            <td>
              <textarea
                className="form-control"
                defaultValue={reviewItem?.description}
                ref={descTxta}
              ></textarea>
            </td>
          </tr>
          <tr>
            <th>시술비용</th>

            <td>{reviewItem?.price}만원</td>
          </tr>

          <tr>
            <th>병원명</th>
            <td>{reviewItem?.clinic}</td>
          </tr>
          <tr>
            <th>시술키워드</th>

            <td>{reviewItem?.keyword}</td>
          </tr>

          {/* <tr>
            <th>작성날짜</th>
            <td>2021.11.03</td>
          </tr> */}
        </tbody>
      </table>
      {/* )} */}

      <div className="btn-wrap d-flex">
        <div className="w-100 d-flex justify-content-center">
          <button
            className="btnSize btn btnBg me-1"
            onClick={() => {
              handleSaveClick();
            }}
          >
            저장하기
          </button>
          <button
            className="btnSize btn btnLine "
            onClick={() => {
              router.push("/reviews");
            }}
          >
            시술후기 목록
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewEdit;
