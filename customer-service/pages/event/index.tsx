import Layout from "../../components/layout";
import { Card, Button } from "react-bootstrap";
import EventsStyles from "../../styles/Event.module.css";
import router from "next/router";
import axios from "axios";

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

interface IndexProp {
  events: EventData[];
}

const Event = ({ events }: IndexProp) => {
  return (
    <div className=" event-wrap">
      <h2 className="title">
        이벤트
        <span className="title-bg" />
      </h2>
      <div className={EventsStyles.events}>
        {events.map((events: any, index: any) => (
          <Card
            key={index}
            className="d-flex"
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push(`/event/detail/${events.id}`);
            }}
          >
            <div key={index}>
              <Card.Body className="d-flex">
                <Card.Img
                  className="me-3"
                  src={events.photoUrl}
                  alt={events.title}
                  style={{ width: "150px", height: "150px," }}
                />

                <div className={EventsStyles.title}>
                  <div className="my-3">
                    <Card.Text style={{ fontWeight: "bold" }}>
                      {events.title}
                    </Card.Text>
                    <Card.Text>{events.description}</Card.Text>
                    <Card.Text>{events.clinic}</Card.Text>
                    <Card.Text style={{ fontWeight: "bold" }}>
                      {events.price}
                    </Card.Text>
                  </div>
                </div>
              </Card.Body>
            </div>
          </Card>
        ))}
      </div>

      {/* 더보기 페이징 */}
      <div className="btn-wrap d-flex justify-content-center">
        <button
          className="btnSize btn btnLine"
          style={{ width: "200px" }}
          onClick={() => {
            router.push("/review");
          }}
        >
          더보기
        </button>
      </div>
      {/* // 더보기 페이징 */}
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios.get<EventData[]>(`http://localhost:8080/events`);
  const events = res.data;

  return { props: { events } };
}

export default Event;
