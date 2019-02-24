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
import { InputBoolean } from "./InputBoolean";
import { Character } from "../Store/Character";

export const ValueView = injectSafe("ui")(injectSafe("character")(observer<React.SFC<{values: Value[]; index: number; typeValue?: Section; editable?: boolean; ui: UI; character?: Character}>>(({values, index, typeValue, editable, ui, character}) => {
    const currentValue = values[index];
    const refValue = typeValue && typeValue.valueByName(currentValue.name, currentValue.value);
    const value = refValue ? currentValue.withReference(refValue) : currentValue;
    if (editable == undefined) editable = ui.editable;
    const initialValue = value.ratioView && character && typeValue && typeValue.name ? character.initialValue(typeValue.name, value.name) : undefined;
    const ratio = initialValue && value.ratio(Number(initialValue.value));

    return <div className={style.wrapper}>
        <div onClick={() => ui.modal}>
            <span className={style.name} style={value.nameStyle}>
                {editable ? <InputValue className={style.nameInput} value={value.name} item={currentValue} nameKey="name" /> : value.name}
            </span>
            {
                editable ?
                <span className={style.valueLabel}>
                    {Boolean(value.preValue) && <span className={style.value}>{value.preValue}</span>}
                    <span className={style.value}>
                        <InputValue className={style.valueLabelInput} value={value.value} item={currentValue} nameKey="value" />
                    </span>
                    {Boolean(value.postValue) && <span className={style.value}>{value.postValue}</span>}
                    {ratio && <span className={style.ratio}>{ratio}</span>}
                </span> :
                value.value != undefined && value.value !== "" &&
                <span className={style.valueLabel} style={value.valueStyle}>
                    {Boolean(value.preValue) && <span className={style.value}>{value.preValue}</span>}
                    <span className={style.value}>{value.value}</span>
                    {Boolean(value.postValue) && <span className={style.value}>{value.postValue}</span>}
                    {ratio && <span className={style.ratio}>{ratio}</span>}
                </span>
            }
            <TagsView tags={value.tags} editable={false} />
            {editable && !refValue && <span className={style.noRefWarn}>参照先ステートなし</span>}
            {editable && <ManipulateButtons items={values} nameKey="fullName" index={index} typeName="値" />}
            {
                editable && ui.editValueStyle && <div className={style.style}>
                    <span className={style.title}>色</span>
                    <InputValue className={style.styleInput} value={value.color} item={currentValue} nameKey="color" placeholder="#fff" />
                    <span className={style.title}>文字サイズ</span>
                    <InputValue className={style.styleInput} value={value.size} item={currentValue} nameKey="size" placeholder="1rem" />
                    <span className={style.title}>太字</span>
                    <InputBoolean checked={value.weight} item={currentValue} nameKey="weight" />
                </div>
            }
            {editable && ui.editValueStyle && <div className={style.preview}><ValueView editable={false} values={[currentValue]} typeValue={typeValue} index={0} /></div>}
        </div>
    </div>;
})));
