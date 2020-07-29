import * as React from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import * as style from "./VisualsView.module.css";
import { injectSafe } from "../injectSafe";
import { Visual } from "../Store/Visual";
import { InputValue } from "./InputValue";
import { ManipulateButtons } from "./ManipulateButtons";
import { Character } from "../Store/Character";
import { Store } from "../Store";
import { v4 as uuidv4 } from 'uuid';

const exts: {[mime: string]: string} = {
    "image/png": "png",
    "image/gif": "gif",
    "image/jpeg": "jpg",
};

export const VisualsView = injectSafe("store")(observer<React.SFC<{character: Character; store: Store}>>(({character, store}) => {
    const ui = store.ui;
    const period = character.period(ui.period);
    if (!period) return <></>;
    const previousPeriod = character.period(ui.period - 1);
    const visuals = period.visuals;
    const existIndex = Math.min(visuals.length - 1, ui.visual);
    const currentVisual = visuals[existIndex];

    return <div className={style.wrapper}>
        <div className={style.imageField}>
            {
                Boolean(currentVisual && currentVisual.url) && <img className={style.image} src={currentVisual.url} />
            }
            {
                ui.editable &&
                <Dropzone
                    accept="image/jpeg, image/png, image/gif"
                    onDrop={async (files, rejectedFiles) => {
                        if (rejectedFiles.length) {
                            alert(`ファイル ${rejectedFiles.map(file => `[${file.name}]`).join(", ")} は許可されない形式です`);
                            return;
                        }
                        if (!files.length) return;
                        ui.visualUploading = true;
                        let index = 0;
                        let file: File;
                        try {
                            while (file = files[index]) {
                                const filename = `${uuidv4()}.${exts[file!.type]}`;
                                const url = await store.tryPutImage(filename, file!);
                                if (!url) throw "no url";
                                if (index === 0 && currentVisual) {
                                    if (currentVisual.filename) ui.saveDeleteVisualUrls.push(currentVisual.filename);
                                    currentVisual.filename = filename;
                                    currentVisual.url = url;
                                } else {
                                    visuals.push(new Visual({filename, url, name: file.name}));
                                }
                                ui.cancelDeleteVisualUrls.push(url);
                                ++index;
                            }
                        } catch (e) {
                            alert(`[${files[index].name}] ${files.slice(index).map(file => `[${file.name}]`).join(", ")}のアップロードに失敗しました`);
                        } finally {
                            ui.visualUploading = false;
                        }
                    }}>
                    {
                        ({getRootProps, getInputProps}) =>
                        <div className={style.uploader} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <span className={style.uploaderMessage}>画像をドロップしてアップロード</span>
                        </div>
                    }
                </Dropzone>
            }
        </div>
        <div className={style.selectors}>
            {
                visuals.map((visual, index) =>
                    <div className={classNames(style.selector, {[style.active]: existIndex === index})} onClick={() => ui.visual = index}>
                        {
                            ui.editable ?
                            <InputValue disabled={ui.visualUploading} item={visual} nameKey="name" /> :
                            visual.name
                        }
                        {
                            ui.editable &&
                            <ManipulateButtons
                                disabled={ui.visualUploading}
                                items={visuals}
                                nameKey="name"
                                index={index}
                                typeName="ビジュアル"
                                after={(afterIndex) => ui.visual = afterIndex}
                                afterDelete={async (deletedVisual) => {
                                    if (deletedVisual.url) ui.saveDeleteVisualUrls.push(deletedVisual.url);
                                }}
                                />
                        }
                    </div>
                )
            }
            {
                ui.editable &&
                <div className={style.selector}>
                    <button disabled={ui.visualUploading} onClick={() => { visuals.push(new Visual()); ui.visual = visuals.length - 1; }}>+</button>
                </div>
            }
            {
                ui.editable && !!previousPeriod &&
                <div className={style.selector}>
                    <button disabled={ui.visualUploading} onClick={() => confirm("直前の時期からコピーしますか？") && visuals.push(...previousPeriod.visuals.map(visual => new Visual(visual)))}>直前の時期から全てコピー</button>
                </div>
            }
        </div>
    </div>;
}));
