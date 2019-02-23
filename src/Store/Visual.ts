import { action, observable, computed } from "mobx";

export class Visual {
    static fromJSON(obj: any) {
        return new Visual(obj);
    }

    @observable filename?: string;
    @observable name?: string;

    constructor(props?: {filename?: string; name?: string}) {
        if (props) {
            if (props.filename) this.filename = props.filename;
            if (props.name) this.name = props.name;
        }
    }
}
