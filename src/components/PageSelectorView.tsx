import * as React from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import * as style from "./PageSelectorView.module.css";
import { UI } from "../Store/UI";
import { Page } from "../Store/Page";
import { injectSafe } from "../injectSafe";
import { ManipulateButtons } from "./ManipulateButtons";

export const PageSelectorView = injectSafe("ui")(observer<React.SFC<{ui: UI; index: number; pages: Page[]}>>(({pages, ui, index}) => {
    const page = pages[index];

    return <div className={classNames(style.wrapper, {[style.active]: ui.page === index})} onClick={() => ui.page = index}>
        {
            ui.editable ?
            <>
                <input className={style.input} value={page.name || ""} onChange={({target}) => page.name = target.value} />
                <ManipulateButtons items={pages} nameKey="name" index={index} typeName="ページ" after={(afterIndex) => ui.page = afterIndex} direction="horizontal" />
            </> :
            page.name ? page.name : "*"
        }
    </div>
}));
