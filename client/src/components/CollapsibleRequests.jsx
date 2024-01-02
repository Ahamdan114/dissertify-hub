import { useState } from "react";
import "./CollapsibleRequests.css";

export const CollapsibleRequests = ({ userType, requests, title }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    // console.log(requests, userType);
    const nameUserSelection = userType === "student";

    const updateState = async (status, requestID) => {
        await fetch(`/api/request/${requestID}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        })
    };

    const handleAccept = (requestID) => {
        console.log(requestID);
        updateState("accepted", requestID);
    };

    const handleReject = (requestID) => {
        console.log(requestID);
        updateState("rejected", requestID);
    };

    return (
        <div className="card">
            <div
                className="card-header"
                onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
            >
                <h3>{title}</h3>
                <button type="submit" className="dropdown_btn">
                    {(isExpanded && "⌄") || "›"}
                </button>
            </div>
            {isExpanded && (
                <div className="flex">
                    {requests.map(
                        ({
                            id,
                            title,
                            description,
                            status,
                            student: { name: studName },
                            professor: { name: profName },
                        }) => (
                            <div key={id}>
                                <div className="card">
                                    <h4>{title}</h4>
                                    <p>{description}</p>
                                    <p>{nameUserSelection ? profName : studName}</p>
                                </div>
                                <div className="buttons_request">
                                    <button
                                        className="btn btn-accept"
                                        onClick={() => handleAccept(id)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="btn btn-reject"
                                        onClick={() => handleReject(id)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};
