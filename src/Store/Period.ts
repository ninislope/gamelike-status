import { action, observable } from "mobx";
import { Page } from "./Page";
import { Section } from "./Section";

export class Period {
    static fromJSON(obj: any) {
        return new Period({
            name: obj.name,
            sections: (obj.sections || []).map(Section.fromJSON),
            pages: (obj.pages || []).map(Page.fromJSON),
            images: obj.images,
        });
    }

    @observable name?: string;
    @observable sections: Section[] = [];
    @observable pages: Page[] = [];
    @observable images: string[] = [];

    constructor(props?: {name?: string; sections?: Section[]; pages?: Page[]; images?: string[]}) {
        if (props) {
            this.name = props.name;
            if (props.sections) this.sections = props.sections;
            if (props.pages) this.pages = props.pages;
            if (props.images) this.images = props.images;
        }
    }

    section(index: number) { return this.sections[index] as Section | undefined; }
    page(index: number) { return this.pages[index] as Page | undefined; }
    image(index: number) { return this.images[index] as string | undefined; }
}
