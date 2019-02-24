import * as React from "react";
import { observer } from "mobx-react";
import * as style from "./ValueDetailView.module.css";
import { Value } from "../Store/Value";
import { TagsView } from "./TagsView";
import { injectSafe } from "../injectSafe";
import { UI } from "../Store/UI";
import { InputValue } from "./InputValue";

export const ValueDetailView = injectSafe("ui")(observer<React.SFC<{value: Value | undefined; ui: UI}>>(({value: value, ui}) =>
    value ?
    <div className={style.wrapper}>
        <span className={style.name}>
            {ui.editable && <span className={style.title}>ステータス名</span>}
            {ui.editable ? <InputValue className={style.nameInput} item={value} nameKey="name" /> : value.name}
        </span>
        {
            ui.editable ?
            <span className={style.valueLabel}>
                <span className={style.title}>値の前単位</span>
                <span className={style.value}><InputValue className={style.valueLabelInput} item={value} nameKey="preValue" placeholder="Lv." /></span>
                <br/>
                <span className={style.title}>値</span>
                <span className={style.value}><InputValue className={style.valueLabelInput} item={value} nameKey="value" placeholder="10" /></span>
                <br/>
                <span className={style.title}>値の後単位</span>
                <span className={style.value}><InputValue className={style.valueLabelInput} item={value} nameKey="postValue" placeholder="段" /></span>
            </span>
            :
            value.value != undefined && value.value !== "" &&
            <span className={style.valueLabel}>
                {Boolean(value.preValue) && <span className={style.value}>{value.preValue}</span>}
                <span className={style.value}>{value.value}</span>
                {Boolean(value.postValue) && <span className={style.value}>{value.postValue}</span>}
            </span>
        }
        <br/>
        <TagsView tags={value.tags} />
        <hr/>
        {ui.editable && <div className={style.title}>簡易説明</div>}
        {
            (ui.editable || Boolean(value.summary)) &&
            <div className={style.summary}>
                {ui.editable ? <textarea className={style.summaryInput} value={value.summary || ""} onChange={({target}) => value.summary = target.value} /> : value.summary}
            </div>
        }
        {ui.editable && <div className={style.title}>詳細説明</div>}
        {
            (ui.editable || Boolean(value.description)) &&
            <div className={style.description}>
                {ui.editable ? <textarea className={style.descriptionInput} value={value.description || ""} onChange={({target}) => value.description = target.value} /> : value.description}
            </div>
        }
    </div> :
    <div className={style.wrapper}></div>
));
