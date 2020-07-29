import * as React from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import * as style from "./CharacterSelector.module.css";
import { injectSafe } from "../injectSafe";
import { Store } from "../Store";
import { CharacterView } from "./CharacterView";
import { AddCharacterView } from "./AddCharacterView";
import { UI } from "../Store/UI";

export const CharacterSelector = injectSafe("store", "ui")(observer<React.SFC<{store: Store; ui: UI}>>(({store, ui}) =>
    <div>
        {!!store.characters.length && <CharacterView character={store.characters[ui.character]} />}
        <div className={style.characterSelectors}>
            {
                store.characters.map((character, index) =>
                    <button
                        key={index}
                        className={classNames(style.charactorSelector, { [style.selected]: index === ui.character})}
                        onClick={() => ui.character = index}
                    >
                        {character.name || (index + 1)}
                    </button>
                )
            }
        </div>
        {ui.editable && <AddCharacterView characters={store.characters} />}
    </div>
));
