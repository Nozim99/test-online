import PropTypes from "prop-types";

const OrderNumbers = ({userAnswers, order, correctAnswers, answersHandle}) => {
  return (
    <ul className="xs:w-96 w-5/6 mx-auto grid grid-cols-5 2xs:grid-cols-6 gap-3 mt-8 pb-10">
      {
        userAnswers.map((item, index) => (
          <li onClick={() => answersHandle(index)} key={index}
              className={`testAnswerStatistics ${
                item ?
                  item === correctAnswers[index] ?
                    (index === order ? "border-4 border-green-600" : "border border-green-600")
                    :
                    index === order ? "border-4 border-red-500" : "border border-red-500"
                  : (index === order ? "border-4 border-blue-600 dark:border-blue-500" : "border border-blue-600 dark:border-blue-500")
              }`}>{index + 1}</li>
        ))
      }
    </ul>
  );
};

OrderNumbers.propTypes = {
  userAnswers: PropTypes.array.isRequired,
  order: PropTypes.number.isRequired,
  correctAnswers: PropTypes.array.isRequired,
  answersHandle: PropTypes.func.isRequired
};

export default OrderNumbers;