import axios from "axios";

const baseUrl = "http://localhost:8080/api";

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

export function post(endpoint: string, data: unknown)
{
    const url = getUrl(endpoint);
    return axios.post(url, data);
}

export function put(endpoint: string, data: unknown)
{
    const url = getUrl(endpoint);
    return axios.put(url, data);
}
