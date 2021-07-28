let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http:localhost:3000';
        break;
    case 'aac-team-gardener-client.herokuapp.com':
            APIURL = 'https://aac-team-gardener.herokuapp.com'
}

export default APIURL;