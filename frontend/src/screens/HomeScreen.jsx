// import axios from "axios";
import { Row, Col } from "react-bootstrap";
// import { useEffect, useState } from "react";
import Products1 from "../components/Products";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { error } from "jquery";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductsCarosel from "../components/ProductsCarosel";
import Meta from "../components/Meta";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const { userInfo } = useSelector((state) => state.user);

  console.log(userInfo);

  return (
    <>
      <div className="text-center">
        <a
          href="https://dineshg-aids.github.io/loginscreen/"
          target="blank"
          className="buddy"
        >
          click here to Register as Farmer 🚀
        </a>
      </div>

      {!keyword ? (
        <ProductsCarosel />
      ) : (
        <Link to="/" className="btn btn-ligth mb-4">
          Go back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variants="danger">
          {/* {error?.data?.message || error.error} */}
        </Message>
      ) : (
        <>
          <Meta title="Welcome to Uzhavan" />

          <h1>Hand picked products {userInfo ? `for ${userInfo.name}` : ""}</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Products1 product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
