import { useState } from "react";
import "./CollapsibleRequests.css";
import Card from "./Card.jsx";
import ButtonGroup from "./ButtonGroup.jsx";

export const CollapsibleRequests = ({ userType, requests, title }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const [feedback, setFeedback] = useState("");
    const nameUserSelection = userType !== "student";

    const updateState = async (status, requestID, feedback) => {
        await fetch(`/api/request/${requestID}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status, feedback }),
        });
        setFeedback("");
    };

    const handleAccept = (requestID) => {
        updateState("accepted", requestID, feedback);
    };

    const handleReject = (requestID) => {
        updateState("rejected", requestID, feedback);
    };

    const handleUpload = (requestID) => {
        updateState("completed", requestID, feedback);
    };

    const handleChange = (e) => setFeedback(e.target.value);

    return (
        <div className="requests">
            <div
                className="requests-header"
                onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
            >
                <h3>{title}</h3>
                <button type="submit" className="dropdown_btn">
                    {(isExpanded && "⌄") || "›"}
                </button>
            </div>
            {isExpanded && (
                <div className="show-requests">
                    {/* To modify here the upper limit of accepted category */}
                    {requests
                        .slice(0, requests.status === "accepted" ? requests.length : 3)
                        .map(({id,title,description,status,student: { name: studName },professor: { name: profName }, transitions,}) => {
                                const lastTransition = transitions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
                                return (
                                    <div className="request-section" key={id}>
                                        <div>{(nameUserSelection === "student" ? profName : studName).split('.')[0]}</div>
                                        <Card
                                            title={title}
                                            description={description}
                                            answer={lastTransition}
                                            name={nameUserSelection ? profName : studName}
                                        />

                                        {nameUserSelection && (
                                            <div>
                                                <ButtonGroup
                                                    status={status}
                                                    id={id}
                                                    handleAccept={handleAccept}
                                                    handleReject={handleReject}
                                                    handleUpload={handleUpload}
                                                />

                                                <div className="text-container">
                                                    <input className="text-env"
                                                        placeholder="Explain the reason..."
                                                        value={feedback}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                        )}
                </div>
            )}
        </div>
    );
};
