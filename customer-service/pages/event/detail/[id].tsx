import axios from "axios";
import { useRouter } from "next/router";
import router from "next/router";
import { Card } from "react-bootstrap";
import { GetServerSideProps } from "next";
import Image from "next/image";

interface EventData {
  id: number;
  title: string;
  photoUrl: string;
  fileType: string;
  fileName: string;
  description: string;
  clinic: string;
  keyword: string;
  price: string;
  createdTime: string;
}

interface DetailProp {
  event: EventData;
}

const EventDetail = ({ event }: DetailProp) => {
  const router = useRouter();
  // const id = router.query.id as string;
  const id = event.id.toString();

  return (
    <div className="width700">
      <h2 className="title text-center">시술후기 상세보기</h2>
      <div className="card">
        <Image
          src={event.photoUrl}
          className="card-img-top"
          alt={event.title}
          layout="responsive"
          objectFit="cover"
          width={220}
          height={150}
        />
        <div className="card-body">
          <div className="card-title" style={{ fontWeight: "bold" }}>
            {event.title}
          </div>
          <div className="card-text">{event.clinic}</div>
          <div className="card-text" style={{ fontWeight: "bold" }}>
            {event.price}
          </div>
        </div>
        <div className="card-body">
          <div className="card-title" style={{ fontWeight: "bold" }}>
            상세설명
          </div>
          <div className="card-text">{event.description}</div>
        </div>
      </div>
      <div className="btn-wrap d-flex">
        <div className="w-100 d-flex justify-content-center">
          <button
            className="btnSize btn btnBg me-1"
            onClick={() => {
              router.push(`/event/reserve/${id}`);
            }}
          >
            상담예약
          </button>
          <button
            className="btnSize btn btnLine"
            onClick={() => {
              router.push(`/event`);
            }}
          >
            이벤트 목록
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  // const a = id;
  const res = await axios.get<EventData[]>(
    `http://localhost:8080/events/${id}`
  );
  const event = res.data;

  return { props: { event } };
};

export default EventDetail;
