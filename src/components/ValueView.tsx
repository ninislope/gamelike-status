import * as React from "react";
import { observer } from "mobx-react";
import * as style from "./ValueView.module.css";
import { Value } from "../Store/Value";
import { injectSafe } from "../injectSafe";
import { TagsView } from "./TagsView";
import { Section } from "../Store/Section";
import { UI } from "../Store/UI";
import { ManipulateButtons } from "./ManipulateButtons";
import { InputValue } from "./InputValue";

export const ValueView = injectSafe("ui")(observer<React.SFC<{values: Value[]; index: number; typeValue?: Section; ui: UI}>>(({values, index, typeValue, ui}) => {
    const currentValue = values[index];
    const refValue = typeValue && typeValue.valueByName(currentValue.name, currentValue.value);
    const value = refValue ? currentValue.withReference(refValue) : currentValue;

    return <div className={style.wrapper}>
        <div onClick={() => ui.modal}>
            <span className={style.name}>
                {ui.editable ? <InputValue className={style.nameInput} value={value.name} item={currentValue} nameKey="name" /> : value.name}
            </span>
            {
                ui.editable ?
                <span className={style.valueLabel}>
                    {Boolean(value.preValue) && <span className={style.value}>{value.preValue}</span>}
                    <span className={style.value}>
                        <InputValue className={style.valueLabelInput} value={value.value} item={currentValue} nameKey="value" />
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
            {ui.editable && <ManipulateButtons items={values} nameKey="fullName" index={index} typeName="値" />}
        </div>
    </div>;
}));
