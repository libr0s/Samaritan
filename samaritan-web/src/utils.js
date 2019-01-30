
export const getHeaders = () => {
    const token = 'Bearer ' + localStorage.getItem('access_token');
    const reqHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': token
    });

    return reqHeaders
}
