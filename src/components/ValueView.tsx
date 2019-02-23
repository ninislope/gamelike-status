import * as React from "react";
import { observer } from "mobx-react";
import * as style from "./ValueView.module.css";
import { Value } from "../Store/Value";
import { injectSafe } from "../injectSafe";
import { TagsView } from "./TagsView";
import { Section } from "../Store/Section";
import { UI } from "../Store/UI";

export const ValueView = injectSafe("ui")(observer<React.SFC<{values: Value[]; index: number; typeValue?: Section; ui: UI}>>(({values, index, typeValue, ui}) => {
    const currentValue = values[index];
    const refValue = typeValue && typeValue.valueByName(currentValue.name, currentValue.value);
    const value = refValue ? currentValue.withReference(refValue) : currentValue;

    return <div className={style.wrapper}>
        <div onClick={() => ui.modal}>
            <span className={style.name}>
                {ui.editable ? <input className={style.nameInput} value={value.name || ""} onChange={({target}) => currentValue.name = target.value} /> : value.name}
            </span>
            {
                ui.editable ?
                <span className={style.valueLabel}>
                    {Boolean(value.preValue) && <span className={style.value}>{value.preValue}</span>}
                    <span className={style.value}>
                        <input className={style.valueLabelInput} value={value.value || ""} onChange={({target}) => currentValue.value = target.value} />
                    </span>
                    {Boolean(value.postValue) && <span className={style.value}>{value.postValue}</span>}
                </span> :
                value.value != undefined && value.value !== "" &&
                <span className={style.valueLabel}>
                    {Boolean(value.preValue) && <span className={style.value}>{value.preValue}</span>}
                    <span className={style.value}>{value.value}</span>
                    {Boolean(value.postValue) && <span className={style.value}>{value.postValue}</span>}
                </span>
            }
            <TagsView tags={value.tags} editable={false} />
            {ui.editable && !refValue && <span className={style.noRefWarn}>参照先ステートなし</span>}
            {ui.editable && <button onClick={() => confirm(`値[${value.fullName}]を削除しますか？`) && values.splice(index, 1)}>×</button>}
        </div>
    </div>;
}));
