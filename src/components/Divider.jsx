import PropTypes from 'prop-types';

const Divider = ({ className = "" }) => {
  return <div className={`border-t w-1/2 mx-auto ${className}`}></div>;
};

Divider.propTypes = {
  className: PropTypes.string,
};

export default Divider;
