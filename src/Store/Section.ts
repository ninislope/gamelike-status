import { action, observable, values } from "mobx";
import { Value } from "./Value";

export class Section {
    static fromJSON(obj: any) {
        return new Section({
            name: obj.name,
            description: obj.description,
            values: (obj.values || []).map(Value.fromJSON),
        });
    }

    @observable name?: string;
    @observable description?: string;
    @observable values: Value[] = [];

    constructor(props?: {name?: string, description?: string, values?: Value[]}) {
        if (props) {
            this.name = props.name;
            this.description = props.description;
            if (props.values) this.values = props.values;
        }
    }

    value(index: number) { return this.values[index] as Value | undefined; }
    valueByName(name: string, value: string | number | undefined) {
        const valueStr = value == undefined ? undefined : value.toString();
        return this.values.find(value =>
            value.name === name &&
            (value.value == undefined || value.value === "" || value.value.toString() === valueStr)
        );
    }
}
