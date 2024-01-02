import React from "react";

const ButtonGroup = ({status, id, handleAccept, handleReject, handleUpload}) => {
    return (
        <div className="buttons_request">
            <button className="btn btn-accept" onClick={() => handleAccept(id)}>
                Accept
            </button>
            {status === "accepted" && (
                <button className="btn btn-reject" onClick={() => handleUpload(id)}>
                    Upload
                </button>
            )}
            <button className="btn btn-reject" onClick={() => handleReject(id)}>
                Reject
            </button>
        </div>
    );
};

export default ButtonGroup;
