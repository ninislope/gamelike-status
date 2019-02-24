import * as React from "react";
import { observer } from "mobx-react";

export interface InputBooleanProps<T extends {[key in NameKey]?: boolean | undefined}, NameKey extends string> extends React.InputHTMLAttributes<HTMLInputElement> {
    item: T;
    nameKey: NameKey;
    checked?: boolean;
}

export const InputBoolean = observer(
    function <T extends {[key in NameKey]?: boolean | undefined}, NameKey extends string>(
        props: InputBooleanProps<T, NameKey>
    ) {
        const { item, nameKey, checked } = props;
        const filteredProps = Object.assign({}, props);
        delete filteredProps.item;
        delete filteredProps.nameKey;
        delete filteredProps.checked;
        const displayValue = "checked" in props ? checked : item[nameKey];

        return <input
            type="checkbox"
            checked={displayValue}
            onChange={({target}) => {
                item[nameKey] = (target.checked ? true : undefined) as T[NameKey];
            }}
            {...filteredProps} />
    }
);
