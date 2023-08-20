// import axios from "axios";
import { Row, Col } from "react-bootstrap";
// import { useEffect, useState } from "react";
import Products1 from "../components/Products";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { error } from "jquery";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  // console.log(data);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variants="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Fresh Products</h1>
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
