import { Alert } from "react-bootstrap";

const Message = ({ variants, children }) => {
  return <Alert variant={variants}>{children}</Alert>;
};
Message.defaultProps = {
  variants: "info",
};
export default Message;
