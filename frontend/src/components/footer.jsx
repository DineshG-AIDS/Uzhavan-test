import { Container, Row, Col } from "react-bootstrap";

const footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <a
              href="https://dineshg-aids.github.io/teamlearners/"
              target="blank"
              className="buddy3"
            >
              Uzhavan &copy; {currentYear}
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default footer;
