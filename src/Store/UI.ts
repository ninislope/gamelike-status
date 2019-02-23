import { action, observable } from "mobx";

export interface IUI {
    character?: number;
    period?: number;
    page?: number;
    section?: number;
    valuesBySection?: {[sectionIndex: string]: number | undefined};
    viewMode?: "characters" | "typeValues";
    editable?: boolean;
}

export class UI implements IUI {
    @observable character = 0;
    @observable period = 0;
    @observable page = 0;
    @observable section = -1;
    @observable valuesBySection: {[sectionIndex: string]: number | undefined} = {};
    @observable editable = false;
    @observable viewMode: "characters" | "typeValues" = "characters";
    @observable modal: JSX.Element | undefined = undefined;

    constructor(props?: IUI) {
        if (!props) return;
        this.character = props.character || 0;
        this.period = props.period || 0;
        this.page = props.page || 0;
        this.section = props.section || 0;
        if (props.valuesBySection) this.valuesBySection = props.valuesBySection;
        if (props.viewMode) this.viewMode = props.viewMode;
        this.editable = Boolean(props.editable);
    }

    valueBySection(sectionIndex: number, index?: number) {
        if (index != undefined) this.valuesBySection[sectionIndex] = index;
        return this.valuesBySection[sectionIndex] || 0;
    }
}
