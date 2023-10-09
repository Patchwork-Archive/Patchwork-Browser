import PropTypes from "prop-types";

function Announcement({ message }) {
    return (
        <div className="bg-yellow-200 p-4 text-yellow-800">
            <p>{message}</p>
        </div>
    );
}

Announcement.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Announcement;