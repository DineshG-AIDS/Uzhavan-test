import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliveredOrderMutation,
} from "../slices/OrderApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: order, refetch, isLoading, erorr } = useGetOrderDetailsQuery(
    orderId
  );

  const [
    deliverOrder,
    { isLoading: loadingDeliver },
  ] = useDeliveredOrderMutation();

  const [payOrder, { isLoading: LoadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypayDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: erorrPaypal,
  } = useGetPayPalClientIdQuery();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (!erorrPaypal && !loadingPaypal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypayDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal?.clientId,
            currency: "USD",
          },
        });
        paypayDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypayDispatch, loadingPaypal, erorrPaypal]);

  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment SuccessFull🔥");
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function(details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment SuccessFull🔥");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }

  function onErorr(err) {
    toast.erorr(err?.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  // console.log(order);
  const delivereOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order Delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

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
            <p>
              <strong>Address : </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode},{order.shippingAddress.country}{" "}
            </p>
            {order.isDelivered ? (
              <Message variants="success">
                Deliverd on {order?.deliveredAt}
              </Message>
            ) : (
              <Message variants="danger">Not Deliverd Yet!</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment Metod :</h2>
            <p>
              <strong>Method : </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variants="success">Paid on {order?.paidAt}</Message>
            ) : (
              <Message variants="danger">Not Paid Yet!</Message>
            )}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt="" fluid rounded></Image>
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} X ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup.Item>
        </ListGroup>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-dark text-white">
                <h2> Order Summary </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax </Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {LoadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: "10px" }}
                      >
                        Test Pay Order
                      </Button>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onErorr}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={delivereOrderHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
