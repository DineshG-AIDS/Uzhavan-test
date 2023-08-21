import { Container, Row, Col } from "react-bootstrap";

const footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <a
              className="buddy3"
              target="blank"
              href="https://dineshg-aids.github.io/teamlearners/"
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
