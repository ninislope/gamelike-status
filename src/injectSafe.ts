import { inject } from "mobx-react";
import { ComponentType } from "react";

export type DiffKey<T, U> = T extends U ? never : T;

export function injectSafe<K extends string>(...keys: K[]) {
    return function <T>(component: ComponentType<T>) {
        return inject(...keys)(component) as unknown as ComponentType<Pick<T, DiffKey<keyof T, K>>>;
    };
}
