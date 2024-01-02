const Card = ({title, answer, description, name}) => {
    const { status, transitionDescription } = answer
    return (
        <div className="card">
            <h4>{title}</h4>
            <p>{description}</p>
            <p>{name}</p>
            <p>{status === "accepted" ? "Approval:" : (status === "rejected" ? "Reason:" : "Waiting:")} {answer.description}</p>
        </div>
    );
};

export default Card;
