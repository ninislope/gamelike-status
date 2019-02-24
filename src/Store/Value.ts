import { action, observable, computed } from "mobx";

export type StyleFor = "value" | "name";

export interface IValue {
    name: string;
    value?: string | number;
    preValue?: string;
    postValue?: string;
    summary?: string;
    description?: string;
    tags?: string[];
    color?: string;
    size?: string;
    weight?: boolean;
    styleFor?: StyleFor;
}

export class Value implements IValue {
    static fromJSON(obj: any) {
        return new Value(obj);
    }

    @observable name: string;
    @observable value?: string | number;
    @observable preValue?: string;
    @observable postValue?: string;
    @observable summary?: string;
    @observable description?: string;
    @observable tags: string[] = [];
    @observable color?: string;
    @observable size?: string;
    @observable weight?: boolean;
    @observable styleFor?: StyleFor;

    constructor(props: IValue) {
        this.name = props.name;
        this.value = props.value;
        this.preValue = props.preValue;
        this.postValue = props.postValue;
        this.summary = props.summary;
        this.description = props.description;
        if (props.tags) this.tags = props.tags;
        this.color = props.color;
        this.size = props.size;
        this.weight = props.weight;
        this.styleFor = props.styleFor;
    }

    @computed get fullName() {
        return [
            this.name,
            this.preValue,
            this.value,
            this.postValue,
        ].filter(v => v != undefined && v !== "").join(" ");
    }

    @computed get nameWithValue() {
        if (this.value != undefined && this.value !== "") {
            return this.fullName;
        } else {
            return this.name;
        }
    }

    @computed private get style() {
        const style: React.CSSProperties = {};
        if (this.color) style.color = this.color;
        if (this.size) style.fontSize = this.size;
        if (this.weight) style.fontWeight = "bold";

        return style;
    }

    @computed get nameStyle() {
        return this.styleFor !== "value" ? this.style : {};
    }

    @computed get valueStyle() {
        return this.styleFor !== "name" ? this.style : {};
    }

    withReference(refValue: IValue) {
        return new Value({
            name: this.name,
            value: this.value != undefined && this.value !== "" ? this.value : refValue.value,
            preValue: this.preValue || refValue.preValue,
            postValue: this.postValue || refValue.postValue,
            summary: this.summary || refValue.summary,
            description: this.description || refValue.description,
            tags: this.tags.length ? this.tags : refValue.tags,
            color: this.color || refValue.color,
            size: this.size || refValue.size,
            weight: this.weight || refValue.weight,
            styleFor: this.styleFor || refValue.styleFor,
        });
    }
}
