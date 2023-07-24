import PropTypes from "prop-types";

const Date = ({date}) => {
  return (
    <div className="flex justify-center">
      <div className="text-center my-4 tracking-wide border border-neutral-400 text-sm px-4 2xs:px-6 py-0.5 rounded-full bg-slate-400/10 font-medium
        dark:border-blue-500">
        {date}
      </div>
    </div>
  );
};

Date.propTypes = {
  date: PropTypes.string.isRequired,
}

export default Date;