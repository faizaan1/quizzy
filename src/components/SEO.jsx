import PropTypes from "prop-types";
import React from 'react';
import { Helmet } from "react-helmet";
import config from '../utils/config.js';
const SEO = ({ title }) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{config.appName + " | " + title}</title>
            <meta name="robots" content="noindex, follow" />
            <meta name="description" content={config.metaDescription} />
            <meta name="keywords" content={config.metaKeyWords}></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta property="og:title" content={config.appName + " | " + title} />
            <meta property="og:type" content="website" />
        </Helmet>
    )
}

SEO.propTypes = {
    title: PropTypes.string
};

export default SEO;
