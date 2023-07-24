
const Statistic = ({correct, allTest}) => {
  const incorrect = allTest - correct;
  const percent = Math.floor(correct * 100 / allTest);

  return (
    <div className="flex justify-center gap-4 mt-10 createItem">
      <div className="testStatistic border-green-500 dark:shadow-green-800/50">
        <div>To&apos;g&apos;ri</div>
        <div>{correct}</div>
      </div>
      <div className="testStatistic border-red-500 dark:shadow-red-800/50">
        <div>Xato</div>
        <div>{incorrect}</div>
      </div>
      <div className="testStatistic border-blue-500 dark:shadow-blue-800/50">
        <div>Foiz</div>
        <div>{percent}%</div>
      </div>
    </div>
  );
};


export default Statistic;