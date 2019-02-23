import * as React from "react";
import { observer } from "mobx-react";
import * as style from "./SectionView.module.css";
import { Section } from "../Store/Section";

export const AddSectionView = observer<React.SFC<{sections: Section[]; message: string}>>(({sections, message}) =>
    <div className={style.wrapper}>
        <button onClick={() => sections.push(new Section())}>{message}</button>
    </div>
);
