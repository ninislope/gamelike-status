import * as React from "react";
import { observer } from "mobx-react";
import * as style from "./PageSelectorsView.module.css";
import { PageSelectorView } from "./PageSelectorView";
import { AddPageView } from "./AddPageView";
import { injectSafe } from "../injectSafe";
import { Page } from "../Store/Page";
import { UI } from "../Store/UI";
import { Period } from "../Store/Period";

export const PageSelectorsView = injectSafe("ui")(observer<React.SFC<{pages: Page[]; previousPeriod: Period | undefined; ui: UI}>>(({pages, previousPeriod, ui}) => {
    return <div className={style.wrapper}>
        {ui.editable && <div className={style.title}>ページ</div>}
        {pages.map((_, index) => <PageSelectorView pages={pages} index={index} />)}
        {ui.editable && <AddPageView pages={pages} />}
        {
            ui.editable && !!previousPeriod && <button onClick={() =>
                confirm("直前の時期からコピーしますか？") &&
                pages.push(...previousPeriod.pages.map(page => Page.fromJSON(page)))
                }>直前の時期から全ページコピー</button>}
    </div>
}));
