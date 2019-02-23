import * as React from "react";
import { observer } from "mobx-react";
import * as style from "./ValueSelectorsView.module.css";
import { injectSafe } from "../injectSafe";
import classNames from "classnames";
import { UI } from "../Store/UI";
import { Value } from "../Store/Value";
import { ManipulateButtons } from "./ManipulateButtons";

export const ValueSelectorsView = injectSafe("ui")(observer<React.SFC<{values: Value[] | undefined; sectionIndex: number; ui: UI}>>(({values, sectionIndex, ui}) =>
    values ?
    <div className={style.wrapper}>
        {
            values.map((value, index) =>
                <div className={classNames(style.button, {[style.active]: ui.valueBySection(sectionIndex) === index})} onClick={() => ui.valueBySection(sectionIndex, index)}>
                    {value.nameWithValue}
                    {ui.editable && <ManipulateButtons items={values} index={index} nameKey="nameWithValue" typeName="値" after={(afterIndex) => ui.valueBySection(sectionIndex, afterIndex)} />}
                </div>
            )
        }
        {ui.editable && <button onClick={() => { values.push(new Value({name: "*"})); ui.valueBySection(sectionIndex, values.length - 1) }}>+</button>}
    </div> :
    <div className={style.wrapper}></div>
));
