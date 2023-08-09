import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Products1 from "../components/Products";

const HomeScreen = () => {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <h1>Fresh Products</h1>
      <Row>
        {Products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Products1 product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
