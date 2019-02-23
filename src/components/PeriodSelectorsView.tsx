import * as React from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import { Character } from "../Store/Character";
import * as style from "./PeriodSelectorsView.module.css";
import { UI } from "../Store/UI";
import { Period } from "../Store/Period";
import { ManipulateButtons } from "./ManipulateButtons";

export const PeriodSelectorsView = observer<React.SFC<{character: Character; ui: UI}>>(({character, ui}) =>
    <div className={style.wrapper}>
        {ui.editable && <div className={style.title}>時期</div>}
        {
            character.periods.map((period, index) =>
                <div className={classNames(style.button, {[style.active]: ui.period === index})} onClick={() => ui.period = index}>
                    {
                        ui.editable ?
                        <input className={style.input} value={period.name} onChange={({target}) => period.name = target.value} /> :
                        period.name == undefined ? "*" : period.name
                    }
                    {ui.editable && <ManipulateButtons items={character.periods} nameKey="name" index={index} typeName="時期" after={(afterIndex) => ui.period = afterIndex} /> }
                </div>
            )
        }
        {
            ui.editable &&
            <div className={style.button}>
                <button onClick={() => { character.periods.push(new Period()); ui.period = character.periods.length - 1; }}>+</button>
            </div>
        }
    </div>
);
