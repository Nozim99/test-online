import Layout from "../Layout/Layout.jsx";
import GroupInfo from "../components/Group/GroupInfo.jsx";
import GroupRBox from "../components/Group/GroupRBox.jsx";
import UserInfo from "../components/Group/UserInfo.jsx";
import Date from "../components/Group/Date.jsx";

const test = [{
  image: "",
  name: "",
  createdBy: "",
  userImage: "",
  participants: 10,
  date: "",
}, 1, 1]
const Group = () => {
  return (
    <Layout>
      <section className="w-10/12 sm:w-96 mx-auto pt-6 min-h-screen dark:text-white">
        <GroupInfo/>
        <Date date={"12-dekabr"} />
        <UserInfo/>
        <GroupRBox test={test}/>
      </section>
    </Layout>
  );
};

export default Group;