import * as React from "react";
import { observer } from "mobx-react";
import * as style from "./SectionView.module.css";
import { UI } from "../Store/UI";
import { Section } from "../Store/Section";
import { ValueView } from "./ValueView";
import { injectSafe } from "../injectSafe";
import { Store } from "../Store";
import { Value } from "../Store/Value";

export const SectionView = injectSafe("store")(observer<React.SFC<{sections: Section[]; index: number; store: Store}>>(({sections, index, store}) => {
    const section = sections[index];
    const ui = store.ui;
    const typeValue = store.typeValueByName(section.name);

    return <div className={style.wrapper}>
        {ui.editable && <div className={style.title}>セクション<button onClick={() => confirm(`セクション[${section.name || ""}]を削除しますか？`) && sections.splice(index, 1)}>×</button></div>}
        {
            ui.editable ?
            <div className={style.name}><input value={section.name || ""} onChange={({target}) => section.name = target.value} placeholder="名前" /></div> :
            Boolean(section.name) && <div className={style.name}>{section.name}</div>
        }
        {
            ui.editable ?
            <div className={style.description}><input value={section.description || ""} onChange={({target}) => section.description = target.value} placeholder="説明" /></div> :
            Boolean(section.description) && <div className={style.description}>{section.description}</div>
        }
        {
            section.values.map((value, index) => <ValueView values={section.values} index={index} typeValue={typeValue} />)
        }
        {
            ui.editable &&
            <div>
                <button onClick={() => section.values.push(new Value({name: "*"}))}>値を追加</button>
                {
                    typeValue && <button onClick={() =>
                    confirm(`[${section.name || ""}]の項目を全てコピーしますか？`) &&
                    typeValue.values.map(value => section.values.push(new Value({name: value.name, value: value.value})))
                    }>同名ステート一覧から項目をコピー</button>
                }
            </div>
        }
    </div>
}));
