import PropTypes from "prop-types";

const Statistic = ({correctAnswer, incorrectAnswer, percent}) => {
  return (
    <div className="flex justify-center gap-4 mt-10 createItem">
      <div className="testStatistic border-green-500 dark:shadow-green-800/50">
        <div>To&apos;g&apos;ri</div>
        <div>{correctAnswer()}</div>
      </div>
      <div className="testStatistic border-red-500 dark:shadow-red-800/50">
        <div>Xato</div>
        <div>{incorrectAnswer()}</div>
      </div>
      <div className="testStatistic border-blue-500 dark:shadow-blue-800/50">
        <div>Foiz</div>
        <div>{percent()}%</div>
      </div>
    </div>
  );
};

Statistic.propTypes = {
  correctAnswer: PropTypes.func.isRequired,
  incorrectAnswer: PropTypes.func.isRequired,
  percent: PropTypes.func.isRequired,
}

export default Statistic;