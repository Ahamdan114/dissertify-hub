import "./Card.css"

const Card = ({title, answer, description, name}) => {
    const { status, transitionDescription } = answer
    return (
        <div className="card">
            <h4 className="card-section">{title}</h4>
            <p className="card-section">{description}</p>
            <p className="card-section">{name}</p>
            <p className="card-section">{status === "accepted" ? "Approval:" : (status === "rejected" ? "Reason:" : "Waiting:")} {answer.description}</p>
        </div>
    );
};

export default Card;
