import axios from "axios";
import {useEffect, useState} from "react";
import {url} from "../../Data/url";

const Statistics = () => {
  const [test, setTest] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(url.basic + url.amountUser).then((result) => {
      setUser(result.data.amount);
    });
    axios.get(url.basic + url.amountTest).then((result) => setTest(result.data));
  }, []);

  return (
    <section
      className={`${test === null ? "animate-pulse" : ""} flex mt-10 2xs:justify-around md:w-100 md:mx-auto flex-col gap-6 w-60 mx-auto 2xs:w-auto 2xs:flex-row 2xs:gap-0`}>
      <div className={`homeStatistics`}>
        <div className="text-center">TEST</div>
        <div className="text-center">
          {test === null ? "..." : test.toLocaleString()}
        </div>
      </div>

      <div className={`homeStatistics ${user === null ? "animate-pulse" : ""}`}>
        <div className="text-center">USER</div>
        <div className="text-center">
          {user === null ? "..." : user.toLocaleString()}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
