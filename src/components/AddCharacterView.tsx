import * as React from "react";
import { observer } from "mobx-react";
import * as style from "./CharacterView.module.css";
import { UI } from "../Store/UI";
import { Character } from "../Store/Character";
import { injectSafe } from "../injectSafe";

export const AddCharacterView = injectSafe("ui")(observer<React.SFC<{characters: Character[]; ui: UI}>>(({characters, ui}) =>
    <div className={style.wrapper}>
        <button onClick={() => characters.push(new Character())}>
            キャラクターを追加
        </button>
    </div>
));
