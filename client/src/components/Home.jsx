import React, { useState, useEffect, useContext } from "react";
import {CollapsibleRequests} from "./CollapsibleRequests";
import RequestForm from "./RequestForm";
import "./Home.css"
import ThemeContext from "../App"
import ThemeChanger from "./ThemeChanger";

const Home = () => {
    
    const userData = JSON.parse(localStorage.getItem("user")).data;
    console.log(userData)
    const {id: userId, name: userName, type: userType} = userData
    const [requests, setRequests] = useState([])
    const isProfessor = userType === 'student'

    const darkTheme = useContext(ThemeContext)

    const fetchRequests = () => fetch(`/api/request/${userId}`)
        .then(res => res.json())
        .then(requests => requests.map(request => {
            const {professor, student} = request
            const user = Object.create(userType === 'student' ? professor : student)
            return {
                ...request,
                user,
            }
        }))
        .then(setRequests)
    
    useEffect(() => {
        fetchRequests()
        setInterval(fetchRequests, 1000 * 20)
    }, [])

    const [isRequest, setIsRequest] = useState(false)

    return (
        <div className="page">
            <div className="introduction-container">
                <h1 className="introduction">
                    Hello {userType} {userName.split(".")[0]}, here is the list of{" "}
                    {userType === "professor" ? "student" : "professor"}s
                </h1>
                <ThemeChanger />
            </div>
            {isProfessor && <button type="submit" className="btn" onClick={() => setIsRequest((prevState) => !prevState)}>Make a new Request</button>}
            {isRequest && <RequestForm callback={fetchRequests} />}

            <div className="dropdowns">
                <CollapsibleRequests userType={userType} title="Accepted Requests" requests={requests.filter(({status}) => status === 'accepted')}/>
                <CollapsibleRequests userType={userType} title="Pending Requests" requests={requests.filter(({status}) => status === 'pending')}/>
                <CollapsibleRequests userType={userType} title="Rejected Requests" requests={requests.filter(({status}) => status === 'rejected')}/>
            </div>
        </div>
    );
};

export default Home;
