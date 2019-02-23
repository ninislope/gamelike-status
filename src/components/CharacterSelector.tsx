import * as React from "react";
import { observer } from "mobx-react";
import { injectSafe } from "../injectSafe";
import { Store } from "../Store";
import { CharacterView } from "./CharacterView";
import { AddCharacterView } from "./AddCharacterView";

export const CharacterSelector = injectSafe("store")(observer<React.SFC<{store: Store}>>(({store}) =>
    <div>
        {
            store.characters.map(character => <CharacterView character={character} />)
        }
        {store.ui.editable && <AddCharacterView characters={store.characters} />}
    </div>
));
