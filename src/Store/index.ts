import { action, observable, toJS } from "mobx";
import { Character } from "./Character";
import { UI } from "./UI";
import { Section } from "./Section";

export class Store {
    @observable characters: Character[] = [];
    @observable typeValues: Section[] = [];
    @observable ui: UI = new UI();

    character(index: number) { return this.characters[index] as Character | undefined; }
    typeValue(index: number) { return this.typeValues[index] as Section | undefined; }
    typeValueByName(name?: string) { return this.typeValues.find(typeValue => typeValue.name === name); }

    @action setJSON(obj: any) {
        if (obj.characters) this.characters = obj.characters.map(Character.fromJSON);
        if (obj.typeValues) this.typeValues = obj.typeValues.map(Section.fromJSON);
    }

    toJSON() {
        return toJS(this);
    }
}
