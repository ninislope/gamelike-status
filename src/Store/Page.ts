import { action, observable } from "mobx";
import { Section } from "./Section";

export class Page {
    static fromJSON(obj: any) {
        return new Page({
            name: obj.name,
            sections: (obj.sections || []).map(Section.fromJSON),
        });
    }

    @observable name?: string;
    @observable sections: Section[] = [];

    constructor(props?: {name?: string; sections?: Section[]}) {
        if (props) {
            this.name = props.name;
            if (props.sections) this.sections = props.sections;
        }
    }

    section(index: number) { return this.sections[index] as Section | undefined; }
}
