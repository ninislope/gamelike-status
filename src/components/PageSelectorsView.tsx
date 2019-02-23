import * as React from "react";
import { observer } from "mobx-react";
import { Character } from "../Store/Character";
import * as style from "./PageSelectorsView.module.css";
import { PageSelectorView } from "./PageSelectorView";
import { UI } from "../Store/UI";
import { AddPageView } from "./AddPageView";
import { injectSafe } from "../injectSafe";
import { Page } from "../Store/Page";

export const PageSelectorsView = injectSafe("ui")(observer<React.SFC<{pages: Page[]; ui: UI}>>(({pages, ui}) => {
    return <div className={style.wrapper}>
        {ui.editable && <div className={style.title}>ページ</div>}
        {pages.map((_, index) => <PageSelectorView pages={pages} index={index} />)}
        {ui.editable && <AddPageView pages={pages} />}
    </div>
}));
