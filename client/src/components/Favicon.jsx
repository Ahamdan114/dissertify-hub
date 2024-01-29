// Favicon.jsx
import React, { useEffect } from "react";
import { FaDiscourse } from "react-icons/fa6";
import { IconContext } from "react-icons";
import ReactDOMServer from "react-dom/server";

// This component dynamically changes the favicon of the page.
// It wasn't done by me if you're wondering.
// I left comments here for future learning for me.

const Favicon = () => {
    useEffect(() => {
        // Create an instance of the React icon component
        const reactIcon = (
            <IconContext.Provider value={{ size: "32px", color: "white" }}>
                <FaDiscourse />
            </IconContext.Provider>
        );

        // Convert the React icon component to an SVG string
        const svgString = ReactDOMServer.renderToString(reactIcon);

        // Create a data URI from the SVG string
        const dataUri = "data:image/svg+xml," + encodeURIComponent(svgString);

        // Change the favicon dynamically
        const favicon = document.getElementById("favicon");
        if (favicon) {
            favicon.href = dataUri;
        }
    }, []);

    return null; // Favicon component doesn't render anything in the UI
};

export default Favicon;
