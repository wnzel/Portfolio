import PropTypes from "prop-types";

function StatusBadge({ status }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-base-content/20 px-2 py-0.5 text-[11px] font-light text-base-content/60">
      {status}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusBadge;
