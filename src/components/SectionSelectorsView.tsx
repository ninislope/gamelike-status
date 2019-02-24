import * as React from "react";
import { observer } from "mobx-react";
import * as style from "./SectionSelectorsView.module.css";
import { injectSafe } from "../injectSafe";
import classNames from "classnames";
import { UI } from "../Store/UI";
import { Section } from "../Store/Section";
import { ManipulateButtons } from "./ManipulateButtons";
import { InputValue } from "./InputValue";

export const SectionSelectorsView = injectSafe("ui")(observer<React.SFC<{sections: Section[]; ui: UI}>>(({sections, ui}) =>
    <div className={style.wrapper}>
        {
            sections.map((section, index) =>
                <div className={classNames(style.button, {[style.active]: ui.section === index})} onClick={() => ui.section = index}>
                    {
                        ui.editable ?
                        <>
                            <InputValue className={style.input} item={section} nameKey="name" />
                            <ManipulateButtons items={sections} index={index} nameKey="name" typeName="セクション" direction="horizontal" after={(afterIndex) => ui.section = afterIndex} />
                        </> :
                        section.name
                    }
                </div>
            )
        }
        {ui.editable && <button onClick={() => { sections.push(new Section({name: "*"})); ui.section = sections.length - 1; }}>+</button>}
    </div>,
));
