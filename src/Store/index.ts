import { action, observable, toJS, computed } from "mobx";
import { Character } from "./Character";
import { UI } from "./UI";
import { Section } from "./Section";
import { Firebase } from "./Firebase";

const initUrl = new URL(location.href);

export class Store {
    @observable loginUid?: string;
    @observable dataId = initUrl.searchParams.get("id") || undefined;
    @observable dataUid = initUrl.searchParams.get("uid") || undefined;
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
        return toJS(
            {
                characters: this.characters,
                typeValues: this.typeValues,
            }
        );
    }

    setId(id: string) {
        if (!this.loginUid) return;
        const url = new URL(location.href);
        url.searchParams.set("uid", this.loginUid);
        url.searchParams.set("id", id);
        location.href = url.toString();
    }

    get editableUid() {
        return Boolean(this.loginUid && (!this.dataUid || this.loginUid === this.dataUid));
    }

    @action async tryLogin() {
        this.loginUid = await Firebase.getUid();
    }

    @action async tryEdit() {
        this.loginUid = await Firebase.getUid();
        if (this.editableUid) {
            this.ui.editable = true;
        }
    }

    @computed get allVisualUrls() {
        return this.characters.flatMap(character => character.periods).flatMap(period => period.visuals).map(visual => visual.url).filter(url => url) as string[];
    }

    @computed get allVisualUrlsHash() {
        const hash: {[url: string]: true} = {};
        for (const url of this.allVisualUrls) hash[url] = true;
        return hash;
    }

    @action async trySave() {
        if (!this.dataId) return; // no
        this.loginUid = await Firebase.getUid();
        if (this.editableUid) {
            if (Firebase.save(this.loginUid!, this.dataId, this.toJSON())) {
                const existUrlsHash = this.allVisualUrlsHash;
                // ignore errors
                await Promise.all(this.ui.saveDeleteVisualUrls.filter(url => !existUrlsHash[url]).map(url => Firebase.deleteImage(url).catch((e) => undefined)));
                this.ui.saveDeleteVisualUrls = [];
                this.ui.cancelDeleteVisualUrls = [];
                this.ui.editable = false;
            }
        }
    }

    @action async cancel() {
        if (!this.dataId) return; // no
        this.loginUid = await Firebase.getUid();
        if (this.editableUid) {
            // ignore errors
            await Promise.all(this.ui.cancelDeleteVisualUrls.map(url => Firebase.deleteImage(url).catch((e) => undefined)));
            this.ui.saveDeleteVisualUrls = [];
            this.ui.cancelDeleteVisualUrls = [];
            // eslint-disable-next-line no-self-assign
            setImmediate(() => location.href = location.href);
        }
    }

    @action async tryLoad() {
        if (this.dataId && this.dataUid) {
            const data = await Firebase.load(this.dataUid, this.dataId);
            if (data) this.setJSON(data);
        }
    }

    @action async tryPutImage(filename: string, data: Blob) {
        if (!this.dataId) return; // no
        this.loginUid = await Firebase.getUid();
        if (this.editableUid) {
            return Firebase.putImage(this.loginUid!, this.dataId, filename, data);
        }
    }
}
