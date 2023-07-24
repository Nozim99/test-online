import {useEffect, useRef} from "react";
import {handleTextareaHeight} from "../../utils/createTest.js";
import {useDispatch, useSelector} from "react-redux";
import {changeInput} from "../../store/slices/createTest.js";

const Variants = () => {
  const dispatch = useDispatch();
  const data = useSelector((state)=>state.createTest);
  const textareaA = useRef(null);
  const textareaB = useRef(null);
  const textareaC = useRef(null);
  const textareaD = useRef(null);

  const changeValue = (e, ref, key) => {
    handleTextareaHeight(ref);
    dispatch(changeInput({index: data.testNum, key, value: e.target.value}))
  }

  useEffect(()=>{
    handleTextareaHeight(textareaA);
    handleTextareaHeight(textareaB);
    handleTextareaHeight(textareaC);
    handleTextareaHeight(textareaD);
  }, [data.testNum])

  return (
    <>
      <div className="createTestTitle">Variantlar</div>
      <div className="flex flex-col gap-5">
        <div
          className="createTestVariantBox"
        >
          <label
            className="createTestVariantLabel"
            htmlFor="a-variant"
          >A</label>
          <textarea
            onChange={(e)=>changeValue(e, textareaA, "a")}
            value={data.data[data.testNum]["a"]}
            className="createTestVariantTextarea"
            placeholder="am"
            rows={1}
            id="a-variant"
            ref={textareaA}
          />
        </div>

        <div
          className="createTestVariantBox"
        >
          <label
            className="createTestVariantLabel"
            htmlFor="b-variant"
          >B</label>
          <textarea
            onChange={(e)=>changeValue(e, textareaB, "b")}
            value={data.data[data.testNum]["b"]}
            className="createTestVariantTextarea"
            placeholder="is"
            rows={1}
            id="b-variant"
            ref={textareaB}
          />
        </div>

        <div
          className="createTestVariantBox"
        >
          <label
            className="createTestVariantLabel"
            htmlFor="c-variant"
          >C</label>
          <textarea
            onChange={(e)=>changeValue(e, textareaC, "c")}
            value={data.data[data.testNum]["c"]}
            className="createTestVariantTextarea"
            placeholder="are"
            rows={1}
            id="c-variant"
            ref={textareaC}
          />
        </div>

        <div
          className="createTestVariantBox"
        >
          <label
            className="createTestVariantLabel"
            htmlFor="d-variant"
          >D</label>
          <textarea
            onChange={(e)=>changeValue(e, textareaD, "d")}
            value={data.data[data.testNum]["d"]}
            className="createTestVariantTextarea"
            placeholder="isn't"
            rows={1}
            id="d-variant"
            ref={textareaD}
          />
        </div>
      </div>
    </>
  );
};

export default Variants;