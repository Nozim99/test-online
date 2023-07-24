import PropTypes from "prop-types";
import {MdNavigateBefore, MdNavigateNext} from "react-icons/md";
import {useNavigate} from "react-router-dom";

const ChooseVariantBtn = ({orderDecrement, chooseAnswer, orderIncrement, userAnswerCount, allAnswerCount}) => {
  const navigate = useNavigate();

  return (
    <div className="xs:w-96 w-5/6 mx-auto mt-5 flex justify-center gap-5">
      <button onClick={orderDecrement} className="testConfirmBtns px-2 text-2xl"><MdNavigateBefore/></button>
      {
        userAnswerCount >= allAnswerCount ?
          <button onClick={() => navigate("/")} className="testConfirmRedBtn px-5">Tark Etish</button>
          :
          <button onClick={chooseAnswer} className="testConfirmBtns px-5">Tanlash</button>
      }
      <button onClick={orderIncrement} className="testConfirmBtns px-2 text-2xl"><MdNavigateNext/></button>
    </div>
  );
};

ChooseVariantBtn.propTypes = {
  orderDecrement: PropTypes.func.isRequired,
  chooseAnswer: PropTypes.func.isRequired,
  orderIncrement: PropTypes.func.isRequired,
  userAnswerCount: PropTypes.number.isRequired,
  allAnswerCount: PropTypes.number.isRequired,
}

export default ChooseVariantBtn;