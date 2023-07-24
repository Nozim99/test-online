import Layout from "../Layout/Layout.jsx";

const PageNotFound = () => {
  return (
    <Layout>
      <section className="min-h-screen bg-white flex items-center dark:bg-[#181743]">
        <div className="relative h-60 xs:h-80 sm:h-96 sm:w-100 mx-auto bg-no-repeat bg-center bg-cover w-full hidden dark:block" style={{backgroundImage: `url("dark404.gif")`}} >
          <div className="w-1 h-60 xs:h-80 sm:h-96 absolute top-0 right-0 bg-[#181743]"></div>
        </div>
        <div className="h-98 xs:h-99 sm:xs:h-100 sm:w-100 mx-auto bg-no-repeat bg-center bg-cover w-full dark:hidden" style={{backgroundImage: `url("light404.gif")`}} ></div>
      </section>
    </Layout>
  );
};

export default PageNotFound;