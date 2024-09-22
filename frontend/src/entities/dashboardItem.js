import generateRandomId from "../utils/generateRandomId";

export class DashboardItem {
    constructor (name, value, type, authorId) {
        this.id = generateRandomId(10);
        this.name = name;
        this.value = value;
        this.type = type;
        this.authorId = authorId;
    }
}