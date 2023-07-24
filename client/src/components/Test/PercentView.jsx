
const PercentView = ({allTest, userAnswers, percent}) => {
  return (
    <div className="xs:w-96 w-5/6 relative h-1.5 rounded-full bg-neutral-200 mx-auto dark:bg-white/30">
      <div style={{width: `${percent}%`}} className="absolute h-full bg-green-400 rounded-full"></div>
      <div style={{right: `${100 - percent}%`}}
           className="absolute h-3.5 w-3.5 rounded-full bg-green-400 top-1/2 -translate-y-1/2">
        <span className="absolute text-xs text-neutral-500 bottom-full right-1/2 translate-x-1/2 dark:text-white">{userAnswers}/{allTest}</span>
      </div>
    </div>
  );
};


export default PercentView;