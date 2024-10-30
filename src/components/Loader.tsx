import { Spinner, Container, Row, Col } from "react-bootstrap";
export default function Loader() {
  return (
    <Container fluid className="d-flex vh-100 p-5 justify-content-center">
      <Row>
        <Col className="text-center">
          <Spinner
            animation="border"
            role="status"
            variant="primary"
            style={{ width: "5rem", height: "5rem" }}
          >
            <span className="visually-hidden text-primary">Loading...</span>
          </Spinner>
          <div style={{ color: "rgb(126, 36, 36)", fontSize: "20px" }}>
            Loading, please wait...
          </div>
        </Col>
      </Row>
    </Container>
  );
}
