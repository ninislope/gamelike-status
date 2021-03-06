import { action, observable } from "mobx";
import { Page } from "./Page";
import { Section } from "./Section";
import { Visual } from "./Visual";

export class Period {
    static fromJSON(obj: any) {
        return new Period({
            name: obj.name,
            sections: (obj.sections || []).map(Section.fromJSON),
            pages: (obj.pages || []).map(Page.fromJSON),
            visuals: (obj.visuals || []).map(Visual.fromJSON),
        });
    }

    @observable name?: string;
    @observable sections: Section[] = [];
    @observable pages: Page[] = [];
    @observable visuals: Visual[] = [];

    constructor(props?: {name?: string; sections?: Section[]; pages?: Page[]; visuals?: Visual[]}) {
        if (props) {
            this.name = props.name;
            if (props.sections) this.sections = props.sections;
            if (props.pages) this.pages = props.pages;
            if (props.visuals) this.visuals = props.visuals;
        }
    }

    section(index: number) { return this.sections[index] as Section | undefined; }
    page(index: number) { return this.pages[index] as Page | undefined; }
    visual(index: number) { return this.visuals[index] as Visual | undefined; }
}
