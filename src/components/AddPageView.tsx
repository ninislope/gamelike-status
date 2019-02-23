import * as React from "react";
import { observer } from "mobx-react";
import * as style from "./PageSelectorView.module.css";
import { UI } from "../Store/UI";
import { Page } from "../Store/Page";
import { injectSafe } from "../injectSafe";

export const AddPageView = injectSafe("ui")(observer<React.SFC<{pages: Page[]; ui: UI}>>(({pages, ui}) =>
    <div className={style.wrapper}>
        <button onClick={() => pages.push(new Page())}>+</button>
    </div>
));
