import React from "react";
import ReactDOM from "react-dom";
import Responsive, { ResponsiveProvider, XS, SM, MD, LG, XL } from "../index";

const App = () => {
    return (
        <React.Fragment>

            <Responsive min="md">
                <div>min md</div>
            </Responsive>

            <Responsive max="md">
                <div>max md</div>
            </Responsive>

            <Responsive minWidth={500}>
                <div>minWidth 500</div>
            </Responsive>

            <Responsive maxWidth={500}>
                <div>maxWidth 500</div>
            </Responsive>

            <Responsive minHeight={300}>
                <div>minHeight 300</div>
            </Responsive>

            <Responsive maxHeight={300}>
                <div>maxHeight 300</div>
            </Responsive>

            <Responsive isPortrait={true}>
                <div>isPortrait</div>
            </Responsive>

            <Responsive isLandscape={true}>
                <div>isLandscape</div>
            </Responsive>

            <hr />

            <Responsive>
                <XS><div>Extra small</div></XS>
                <SM><div>Small</div></SM>
                <MD><div>Medium</div></MD>
                <LG><div>Large</div></LG>
                <XL><div>Extra large</div></XL>
            </Responsive>

            <hr />

            <Responsive isPortrait={true}>
                <XS><div>Extra small</div></XS>
                <SM><div>Small</div></SM>
                <MD><div>Medium</div></MD>
                <LG><div>Large</div></LG>
                <XL><div>Extra large</div></XL>
            </Responsive>

            {/* <Responsive>
                <div>Extra small</div>
                <div>Small</div>
            </Responsive>

            <Responsive>
                <XS><div>Extra small</div></XS>
                <SM><div>Small</div></SM>
                <MD><div>Medium</div></MD>
                <LG><div>Large</div></LG>
                <XL><div>Extra large</div></XL>
                <XS><div>Extra small</div></XS>
            </Responsive> */}

        </React.Fragment>
    );
};

ReactDOM.render(
    <ResponsiveProvider>
        <App />
    </ResponsiveProvider>,
    document.getElementById("root")
);