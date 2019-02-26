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
    afterDelete?: (deleted: T) => any;
    disabled?: boolean;
}

export const ManipulateButtons = observer(
    function <T extends {[key in NameKey]?: string | undefined}, NameKey extends string>(
        {items, index, nameKey, typeName, direction = "vertical", after, afterDelete, disabled}: ManipulateButtonsProps<T, NameKey>
    ) {
        return <>
            <button style={{fontWeight: "bold"}} disabled={disabled} onClick={() => { if (confirm(`${typeName}[${items[index][nameKey] || ""}]を削除しますか？`)) { const [deleted] = items.splice(index, 1); if (afterDelete) setImmediate(() => afterDelete(deleted)); }}}>×</button>
            {index > 0 && <button disabled={disabled} onClick={() => { items.splice(index - 1, 0, items.splice(index, 1)[0]); if (after) setImmediate(() => after(index - 1)); }}>{arrow[direction].prev}</button>}
            {index < items.length - 1 && <button disabled={disabled} onClick={() => { items.splice(index + 1, 0, items.splice(index, 1)[0]); if (after) setImmediate(() => after(index + 1)); }}>{arrow[direction].next}</button>}
        </>
    }
);
