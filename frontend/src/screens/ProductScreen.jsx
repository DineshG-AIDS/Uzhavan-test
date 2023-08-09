import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
// import products from "../products";
import axios from "axios";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const { id: productsId } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productsId}`);
      setProduct(data);
    };
    fetchProduct();
  }, [productsId]);
  return (
    <>
      <Link className="btn btn-dark my-3 " to="/">
        Go Back🔙
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.Name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.Name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating value={product.rating} text={product.numReviews} />
            </ListGroupItem>
            <ListGroupItem>Price : $ {product.price}</ListGroupItem>
            <ListGroupItem>Description : {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "InStock😀" : "OutOfStock😔"}
                    </strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart🎉
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
