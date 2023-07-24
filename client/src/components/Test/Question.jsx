import {PropTypes} from "prop-types";

const Question = ({question, order}) => {
  return (
    <div className="mt-8 border-2 border-blue-700 xs:w-96 w-5/6 mx-auto px-5 py-2 rounded-lg relative dark:border-blue-500 dark:shadow-lg dark:shadow-blue-700/50">
      <div
        className={`${String(order + 1).length === 1 ? "w-6 h-6 -top-3 -left-3" : String(order + 1).length === 2 ? "w-7 h-7 -top-4 -left-4" : "w-9 h-9 -top-5 -left-5"} absolute rounded-full bg-blue-700 text-white flex justify-center items-center text-sm font-medium dark:bg-blue-500`}>
        {order + 1}
      </div>
      {question}
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
}

export default Question;