import React from 'react';

const getURLApi = () => {
    const url_production = process.env.REACT_APP_PRODUCTION_URL_API;
    const url_development = process.env.REACT_APP_DEVELOPMENT_URL_API;
    return process.env.NODE_ENV === "development" ? url_development : url_production;
}

export {
    getURLApi
}