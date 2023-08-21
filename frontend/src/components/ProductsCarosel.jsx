import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductQuery } from "../slices/productsApiSlice";

const ProductsCarosel = () => {
  const { data: products, isLoading, error } = useGetTopProductQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variants="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary my-4">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}></Link>
          <div className="center">
            {" "}
            <Image src={product.image} fluid />
            {/* <Image src="images/farm.jep" /> */}
          </div>
          <Carousel.Caption className="carousel-caption">
            <h2>
              {product.name} (💲{product.price})
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductsCarosel;
