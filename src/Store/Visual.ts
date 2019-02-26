import { action, observable, computed } from "mobx";

export class Visual {
    static fromJSON(obj: any) {
        return new Visual(obj);
    }

    @observable filename?: string;
    @observable url?: string;
    @observable name?: string;

    constructor(props?: {filename?: string; url?: string; name?: string}) {
        if (props) {
            if (props.filename) this.filename = props.filename;
            if (props.url) this.url = props.url;
            if (props.name) this.name = props.name;
        }
    }
}
