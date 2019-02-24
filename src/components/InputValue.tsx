import * as React from "react";
import { observer } from "mobx-react";

export interface InputValueProps<T extends {[key in NameKey]?: string | number | undefined}, NameKey extends string> extends React.InputHTMLAttributes<HTMLInputElement> {
    item: T;
    nameKey: NameKey;
    value?: any;
}

export const InputValue = observer(
    function <T extends {[key in NameKey]?: string | number | undefined}, NameKey extends string>(
        props: InputValueProps<T, NameKey>
    ) {
        const { item, nameKey, value } = props;
        const filteredProps = Object.assign({}, props);
        delete filteredProps.item;
        delete filteredProps.nameKey;
        delete filteredProps.value;
        const displayValue = "value" in props ? value : item[nameKey];

        return <input
            value={displayValue == undefined ? "" : displayValue}
            onChange={({target}) => {
                const value = target.value;
                if (value == undefined || value === "") {
                    item[nameKey] = undefined as T[NameKey];
                } else {
                    item[nameKey] = value as T[NameKey];
                }
            }}
            {...filteredProps} />
    }
);
