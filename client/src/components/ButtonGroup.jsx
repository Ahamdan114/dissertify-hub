import "./ButtonGroup.css"

const ButtonGroup = ({ status, id, handleAccept, handleReject, handleUpload }) => {
    return (
        <div className="buttons_request">
            <button className="general-btn btn-accept" onClick={() => handleAccept(id)}>
                Accept
            </button>
            {status === "accepted" && (
                <button className="general-btn btn-upload" onClick={() => handleUpload(id)}>
                    Upload
                </button>
            )}
            <button className="general-btn btn-reject" onClick={() => handleReject(id)}>
                Reject
            </button>
        </div>
    );
};

export default ButtonGroup;
