import axios from "axios";

const baseUrl = "http://localhost:8080";

function getUrl(endpoint: string)
{
    if(endpoint.charAt(0) !== "/")
        endpoint = "/" + endpoint;
    return `${baseUrl}${endpoint}`;
}

export function get(endpoint: string)
{
    const url = getUrl(endpoint);
    return axios.get(url);
}
