import * as React from "react";
import { observer, Provider } from "mobx-react";
import { Character } from "../Store/Character";
import * as style from "./CharacterView.module.css";
import { PeriodSelectorsView } from "./PeriodSelectorsView";
import { UI } from "../Store/UI";
import { StatusView } from "./StatusView";
import { injectSafe } from "../injectSafe";
import { VisualsView } from "./VisualsView";

export const CharacterView = injectSafe("ui")(observer<React.SFC<{character: Character; ui: UI}>>(({character, ui}) =>
    <div className={style.wrapper}>
        <div className={style.periods}>
            <PeriodSelectorsView character={character} ui={ui} />
        </div>
        <div className={style.visual}>
            <VisualsView character={character} />
        </div>
        <div className={style.status}>
            <Provider character={character}>
                <StatusView character={character} />
            </Provider>
        </div>
    </div>
));
