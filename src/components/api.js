const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
};

const toJSON = (response) => {
    return response.json();
};

export default class API {
    static getData() {
       return API._load(`https://api.github.com/gists/public`)
           .then(toJSON)
           .then(API.parseGists);
    }

    static parseGists(data) {
        debugger
        return data.map((gist) => {
            const key = Object.keys(gist[`files`])[0];
            return gist[`files`][key];
        });
    }

    static _load(url) {
        return fetch(url)
            .then(checkStatus)
            .catch((err) => {
                throw err;
            })
    }

}
