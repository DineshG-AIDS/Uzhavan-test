import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      <span>
        {value >= 1 ? (
          <FaStar className="medi" />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt className="medi" />
        ) : (
          <FaRegStar className="medi" />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar className="medi" />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt className="medi" />
        ) : (
          <FaRegStar className="medi" />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar className="medi" />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt className="medi" />
        ) : (
          <FaRegStar className="medi" />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar className="medi" />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt className="medi" />
        ) : (
          <FaRegStar className="medi" />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar className="medi" />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt className="medi" />
        ) : (
          <FaRegStar className="medi" />
        )}
      </span>
      <span className="rating-text">{text && text}</span>
    </div>
  );
};

export default Rating;
