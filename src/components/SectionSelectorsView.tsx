import * as React from "react";
import { observer } from "mobx-react";
import * as style from "./SectionSelectorsView.module.css";
import { injectSafe } from "../injectSafe";
import classNames from "classnames";
import { UI } from "../Store/UI";
import { Section } from "../Store/Section";

export const SectionSelectorsView = injectSafe("ui")(observer<React.SFC<{sections: Section[]; ui: UI}>>(({sections, ui}) =>
    <div className={style.wrapper}>
        {
            sections.map((section, index) =>
                <div className={classNames(style.button, {[style.active]: ui.section === index})} onClick={() => ui.section = index}>
                    {
                        ui.editable ?
                        <>
                            <input value={section.name} onChange={({target}) => section.name = target.value}/>
                            <button onClick={() => confirm(`セクション[${section.name || ""}]を削除しますか？`) && sections.splice(index, 1)}>×</button>
                        </> :
                        section.name
                    }
                </div>
            )
        }
        {ui.editable && <button onClick={() => { sections.push(new Section({name: "*"})); ui.section = sections.length - 1; }}>+</button>}
    </div>,
));
