import * as React from "react";
import { observer } from "mobx-react";
import * as style from "./PageView.module.css";
import { UI } from "../Store/UI";
import { Page } from "../Store/Page";
import { SectionView } from "./SectionView";
import { AddSectionView } from "./AddSectionView";
import { Period } from "../Store/Period";
import { injectSafe } from "../injectSafe";
import { Character } from "../Store/Character";

export const PageView = injectSafe("ui")(observer<React.SFC<{character: Character; period: Period; page: Page; ui: UI}>>(({character, period, page, ui}) =>
    <div className={style.wrapper}>
        {ui.editable && <div className={style.title}>キャラ共通のセクション</div>}
        {character.sections.map((section, index) => <SectionView sections={character.sections} index={index} />)}
        {ui.editable && <AddSectionView sections={character.sections} message="キャラ共通セクションを追加" />}
        {ui.editable && <div className={style.title}>時期共通のセクション</div>}
        {period.sections.map((section, index) => <SectionView sections={period.sections} index={index} />)}
        {ui.editable && <AddSectionView sections={period.sections} message="時期共通セクションを追加" />}
        {ui.editable && <div className={style.title}>ページごとのセクション</div>}
        {page.sections.map((section, index) => <SectionView sections={page.sections} index={index} />)}
        {ui.editable && <AddSectionView sections={page.sections} message="ページセクションを追加" />}
    </div>
));
