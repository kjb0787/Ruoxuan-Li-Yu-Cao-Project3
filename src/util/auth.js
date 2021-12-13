export function getToken() {
    const user = JSON.parse(localStorage.getItem('username'));
    if (user && user.token) {
        return {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        }
    }
    return {};
}