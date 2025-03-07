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
    <Message variants="danger">
      {error?.data?.message || error?.error || "An error occurred"}
    </Message>
  ) : products?.length > 0 ? (
    <Carousel pause="hover" className="bg-primary my-4">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <div className="center">
              <Image src={product.image} fluid />
            </div>
          </Link>
          <Carousel.Caption className="carousel-caption">
            <h2>
              {product.name} ₹({product.price})
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  ) : (
    <Message variants="info">No top products available</Message>
  );
};

export default ProductsCarosel;
