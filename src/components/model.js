export default class Model {
    constructor(data = {}) {

    }

    static parseGists(data) {
        return data.map((gist) => gist[`files`]);
    }
}
