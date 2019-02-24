import * as React from "react";
import { observer, IReactComponent } from "mobx-react";
import { injectSafe } from "../injectSafe";
import { UI } from "../Store/UI";

const arrow = {
    vertical: {
        prev: "↑",
        next: "↓",
    },
    horizontal: {
        prev: "←",
        next: "→",
    },
}

export interface ManipulateButtonsProps<T extends {[key in NameKey]?: string | undefined}, NameKey extends string> {
    items: T[];
    index: number;
    nameKey: NameKey;
    typeName: string;
    direction?: keyof typeof arrow;
    after?: (index: number) => any;
}

export const ManipulateButtons = observer(
    function <T extends {[key in NameKey]?: string | undefined}, NameKey extends string>(
        {items, index, nameKey, typeName, direction = "vertical", after}: ManipulateButtonsProps<T, NameKey>
    ) {
        return <>
            <button style={{fontWeight: "bold"}} onClick={() => confirm(`${typeName}[${items[index][nameKey] || ""}]を削除しますか？`) && items.splice(index, 1)}>×</button>
            {index > 0 && <button onClick={() => { items.splice(index - 1, 0, items.splice(index, 1)[0]); if (after) setImmediate(() => after(index - 1)); }}>{arrow[direction].prev}</button>}
            {index < items.length - 1 && <button onClick={() => { items.splice(index + 1, 0, items.splice(index, 1)[0]); if (after) setImmediate(() => after(index + 1)); }}>{arrow[direction].next}</button>}
        </>
    }
);
