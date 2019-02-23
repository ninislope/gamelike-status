import * as React from "react";
import { observer } from "mobx-react";
import { Character } from "../Store/Character";
import * as style from "./StatusView.module.css";
import { PageSelectorsView } from "./PageSelectorsView";
import { UI } from "../Store/UI";
import { PageView } from "./PageView";
import { injectSafe } from "../injectSafe";

export const StatusView = injectSafe("ui")(observer<React.SFC<{character: Character; ui: UI}>>(({character, ui}) => {
    if (!character.periods.length) {
        return <div className={style.wrapper}><div>時期を追加して下さい</div></div>;
    }
    const period = character.period(ui.period);
    if (!period) {
        return <div className={style.wrapper}><div>時期を選択して下さい</div></div>;
    }
    const previousPeriod = character.period(ui.period - 1);
    const page = period && period.pages.length && period.page(ui.page);

    return <div className={style.wrapper}>
        <div key="PageView">
            {
                !!page ?
                <PageView character={character} period={period} page={page} /> :
                <div>ページを追加して下さい</div>
            }
        </div>
        <div key="PageSelectorsView">
            <PageSelectorsView pages={period.pages} previousPeriod={previousPeriod} />
        </div>
    </div>;
}));
