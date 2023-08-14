import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetOrderDetailsQuery } from "../slices/OrderApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, refectch, isLoading, erorr } = useGetOrderDetailsQuery(
    orderId
  );
  //   console.log(order);

  return isLoading ? (
    <Loader />
  ) : erorr ? (
    <Message variants="danger" />
  ) : (
    <>
      <h1>Order</h1>
      <Row>
        <Col md={8}>Columns</Col>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Shopping </h2>
            <p>
              <strong>Name : </strong>
              {order.user.name}
            </p>
            <p>
              <strong>Email : </strong>
              {order.user.email}
            </p>
          </ListGroup.Item>
        </ListGroup>

        <Col md={8}>Columns</Col>
      </Row>
    </>
  );
};

export default OrderScreen;
