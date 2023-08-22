import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetProductsQuery,
  useCreateProductsMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import Paginate from "../../components/Paginate";
import { toast } from "react-toastify";

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });
  // console.log(data);
  const [
    createProduct,
    { isLoading: loadingProducts },
  ] = useCreateProductsMutation();

  const [
    deleteproduct,
    { isLoading: loadingdelete },
  ] = useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("areU Sure U want to create nwe products")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  //   console.log(products);
  const deleteHandler = async (id) => {
    if (window.confirm("are u sure")) {
      try {
        await deleteproduct(id);
        toast.success("Products Deleted😔");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="m-3 btn-sm" onClick={createProductHandler}>
            <FaEdit /> Create Products
          </Button>
        </Col>
      </Row>
      {loadingProducts && <Loader />}
      {loadingdelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variants="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id} </td>
                  <td>{product?.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit style={{ color: "#66bb6a" }} />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
