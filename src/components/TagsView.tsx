import * as React from "react";
import { observer } from "mobx-react";
import * as style from "./TagsView.module.css";
import { injectSafe } from "../injectSafe";
import { UI } from "../Store/UI";

export const TagsView = injectSafe("ui")(observer<React.SFC<{tags: string[]; ui: UI; editable?: boolean}>>(({tags, ui, editable = true}) =>
    <span className={style.tags}>
        {
            tags.map((tag, index) =>
                <span className={style.tag}>{
                    editable && ui.editable ?
                    <>
                        <input value={tag} onChange={({target}) => tags[index] = target.value} />
                        <button onClick={() => confirm(`タグ[${tag || ""}]を削除しますか？`) && tags.splice(index, 1)}>×</button>
                    </> :
                    tag
                }</span>
            )
        }
        {editable && ui.editable && <button onClick={() => tags.push("*")}>タグ+</button>}
    </span>
));
