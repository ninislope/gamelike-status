import {observable} from "mobx";
import { Period } from "./Period";
import { Section } from "./Section";

export class Character {
    static fromJSON(obj: any) {
        return new Character({
            sections: (obj.sections || []).map(Section.fromJSON),
            periods: (obj.periods || []).map(Period.fromJSON),
        });
    }

    @observable sections: Section[] = [];
    @observable periods: Period[] = [];

    constructor(props?: {sections?: Section[]; periods?: Period[]}) {
        if (props) {
            if (props.sections) this.sections = props.sections;
            if (props.periods) this.periods = props.periods;
        }
    }

    period(index: number) { return this.periods[index] as Period | undefined; }

    initialValue(sectionName: string, valueName: string) {
        for (const period of this.periods) {
            let section = period.sections.find(section => section.name === sectionName);
            if (!section) {
                for (const page of period.pages) {
                    section = page.sections.find(section => section.name === sectionName);
                    if (section) break;
                }
            }
            if (!section) continue;
            const value = section.values.find(value => value.name === valueName);
            if (value) return value;
        }
    }
}
