import PropTypes from "prop-types";
import {useEffect, useState} from "react";

const symbols = ["a", "b", "c", "d"];
const Variants = ({answer, setAnswer, variants, isTrueHandle, userAnswer}) => {
  const variantsSymbol = ["A", "B", "C", "D"];

  return (
    <div className="xs:w-96 w-5/6 mx-auto flex flex-col gap-3 mt-5">
      {symbols.map((item, index) => (
        <div onClick={() => setAnswer(answer === variantsSymbol[index] ? "" : variantsSymbol[index])} key={index} className={`testAnswers ${
          isTrueHandle() === null ?
            (answer ? (answer === variantsSymbol[index] ? "bg-blue-100 border-blue-700 dark:bg-neutral-800 dark:border-blue-600 dark:shadow-blue-700/50" : "border-blue-700 dark:bg-[#0F172A] dark:border-blue-600 dark:shadow-blue-700/50")
              : "border-blue-700 dark:bg-[#0F172A] dark:border-blue-600 dark:shadow-blue-700/50")
            : userAnswer === variantsSymbol[index] ?
              (isTrueHandle() ? "bg-green-50 border-green-700 dark:bg-green-700 dark:border-green-900 dark:shadow-green-700/50" : "bg-red-50 border-red-900 dark:bg-red-700 dark:border-red-900 dark:shadow-red-700/50")
              : "border-blue-700 dark:bg-[#0F172A] dark:border-blue-600 dark:shadow-blue-700/50"
        }`}>
          {variants[item]}
          <div onClick={() => setAnswer(answer === variantsSymbol[index] ? "" : variantsSymbol[index])} className={`testVariant ${
            isTrueHandle() === null ?
              (answer ? (answer === variantsSymbol[index] ? "bg-blue-100 border-blue-700 dark:bg-neutral-800 dark:border-blue-600" : "border-blue-700 bg-neutral-100 dark:bg-[#0F172A] dark:border-blue-600")
                : "border-blue-700 bg-neutral-100 dark:bg-[#0F172A] dark:border-blue-600")
              : userAnswer === variantsSymbol[index] ?
                (isTrueHandle() ? "bg-green-50 border-green-700 dark:bg-green-700 dark:border-green-900" : "bg-red-50 border-red-700 dark:bg-red-700 dark:border-red-900")
                : "border-blue-700 bg-neutral-100 dark:bg-[#0F172A] dark:border-blue-600"
          }`}>{variantsSymbol[index]}</div>
        </div>
      ))}
    </div>
  );
};

Variants.propTypes = {
  answer: PropTypes.string.isRequired,
  setAnswer: PropTypes.func.isRequired,
  variants: PropTypes.array.isRequired,
  isTrueHandle: PropTypes.func.isRequired,
  userAnswer: PropTypes.string.isRequired,
}

export default Variants;