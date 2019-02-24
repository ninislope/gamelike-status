import * as React from "react";
import { observer, Provider } from "mobx-react";
import * as style from "./TypeValuesView.module.css";
import { injectSafe } from "../injectSafe";
import { SectionSelectorsView } from "./SectionSelectorsView";
import { ValueSelectorsView } from "./ValueSelectorsView";
import { ValueDetailView } from "./ValueDetailView";
import { Store } from "../Store";

export const TypeValuesView = injectSafe("store")(observer<React.SFC<{store: Store}>>(({store}) => {
    const typeValueSection = store.typeValue(store.ui.section);

    return <div className={style.wrapper}>
        <div className={style.sectionSelector}>
            <SectionSelectorsView sections={store.typeValues} />
        </div>
        <div className={style.main}>
            <div><ValueSelectorsView values={typeValueSection ? typeValueSection.values : undefined} sectionIndex={store.ui.section} /></div>
            <div>
                <Provider character={undefined}>
                    <ValueDetailView value={typeValueSection ? typeValueSection.value(store.ui.valueBySection(store.ui.section)) : undefined} />
                </Provider>
            </div>
        </div>
    </div>;
}));
