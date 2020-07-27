import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const Context = createContext();

const Responsive = ({ children, ...props }) => {
    const { width, height } = useContext(Context);

    if (!isValid(width, height, props)) {
        return null;
    }

    if (Array.isArray(children)) {
        return renderChildren(width, children);
    }

    return children;
};

Responsive.propTypes = {
    min: PropTypes.string,
    max: PropTypes.string,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    minHeight: PropTypes.number,
    maxHeight: PropTypes.number,
    isPortrait: PropTypes.bool,
    isLandscape: PropTypes.bool,
    children: PropTypes.node.isRequired
};

/* --------------------------------------------------------------- */

const ResponsiveProvider = ({ children }) => {
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    return (
        <Context.Provider value={dimensions}>
            {children}
        </Context.Provider>
    )
}

ResponsiveProvider.propTypes = {
    children: PropTypes.node.isRequired
};

/* --------------------------------------------------------------- */

const XL = ({ children }) => children;
const LG = ({ children }) => children;
const MD = ({ children }) => children;
const SM = ({ children }) => children;
const XS = ({ children }) => children;

/* --------------------------------------------------------------- */

export default Responsive;
export { ResponsiveProvider, XL, LG, MD, SM, XS };

const XL_SIZE = 1200;
const LG_SIZE = 992;
const MD_SIZE = 768;
const SM_SIZE = 576;

function isValid(width, height, { min, max, minWidth, maxWidth, minHeight, maxHeight, isPortrait, isLandscape }) {
    return (
        (min === undefined || isMin(width, min)) &&
        (max === undefined || isMax(width, max)) &&

        (minWidth === undefined || width >= minWidth) &&
        (maxWidth === undefined || width <= maxWidth) &&

        (minHeight === undefined || height >= minHeight) &&
        (maxHeight === undefined || height <= maxHeight) &&

        (!isPortrait || height >= width) &&
        (!isLandscape || height < width)
    );
}

function isMin(width, size) {
    switch (size) {
        case "xl": return width >= XL_SIZE;
        case "lg": return width >= LG_SIZE;
        case "md": return width >= MD_SIZE;
        case "sm": return width >= SM_SIZE;
        case "xs": return true;
        default: return false;
    }
}

function isMax(width, size) {
    switch (size) {
        case "xl": return true;
        case "lg": return width < XL_SIZE;
        case "md": return width < LG_SIZE;
        case "sm": return width < MD_SIZE;
        case "xs": return width < SM_SIZE;
        default: return false;
    }
}

function renderChildren(width, children) {
    const map = {};
    children.forEach(c => {
        switch (c.type) {
            case XL:
            case LG:
            case MD:
            case SM:
            case XS: {
                const field = c.type.name.toLowerCase();
                if (map[field]) {
                    throw Error("Duplicate child tag child <" + c.type.name + "> in <Responsive>. Each tag must be unique.");
                }
                map[field] = c;
                break;
            }
            default:
                throw Error("Invalid child '" + c.type + "' in <Responsive>. Expected: <XL>, <LG>, <MD>, <SM>, <XS>.");
        }
    });
    return renderResponsive(width, map);
}

function renderResponsive(width, { xs, sm, md, lg, xl }) {
    // Extra large (xl)
    if (width >= XL_SIZE) {
        if (xl) return xl;
    }

    // Large (lg)
    if (width >= LG_SIZE) {
        if (lg) return lg;
        if (xl) return xl;
    }

    // Medium (md)
    if (width >= MD_SIZE) {
        if (md) return md;
        if (lg) return lg;
        if (xl) return xl;
    }

    // Small (sm)
    if (width >= SM_SIZE) {
        if (sm) return sm;
        if (md) return md;
        if (lg) return lg;
        if (xl) return xl;
    }

    // Extra small (xs)
    if (xs) return xs;
    if (sm) return sm;
    if (md) return md;
    if (lg) return lg;
    if (xl) return xl;
    return null;
}