import React from "react";

/**
 *
 * @param {{icon}} props
 */

function FontIcon({ icon, classes = "", ...rest }) {
    return <i className={`ic-${icon} ${classes}`} {...rest}></i>;
}

export default FontIcon;
