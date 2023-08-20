import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To Uzhavan",
  description:
    "Uzhavan is a web app where you will buy and sell Fresh products.",
  keywords: "farming,farmer,agriculture,india,farmertoconsumer",
};

export default Meta;
