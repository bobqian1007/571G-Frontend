import {notification} from "antd";

export const errorHandler = (error) => {
    let {response} = error;

    if (response && response.status) {
        const errorText = codeMessage[response.status] || response.statusText;
        const {status, url} = response;
        notification.error({
            message: `request error ${status}: ${url}`,
            description: errorText,
        });
    } else if (!response) {
        notification.error({
            description: 'your network has some issues, could not connect the eth',
            message: 'network error',
        });
    }
    if (response == null){
        response = {};
    }
    response.hasError = true;
    return response;
};

export function checkIfResValid(res){
    return !res || !res.hasError
}