import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    ></Spinner>
  );
};

export default Loader;

// import Button from "react-bootstrap/Button";
// import Spinner from "react-bootstrap/Spinner";

// function Loader() {
//   return (
//     <>
//       <Button variant="primary" disabled>
//         <Spinner
//           as="span"
//           animation="border"
//           size="sm"
//           role="status"
//           aria-hidden="true"
//         />
//         <span className="visually-hidden">Loading...</span>
//       </Button>{" "}
//     </>
//   );
// }

// export default Loader;
