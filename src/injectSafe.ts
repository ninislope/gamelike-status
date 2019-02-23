import { inject, IReactComponent } from "mobx-react";

export type DiffKey<T, U> = T extends U ? never : T;

export function injectSafe<K extends string>(key: K) {
    return function <T>(component: IReactComponent<T>) {
        return inject(key)(component) as unknown as IReactComponent<Pick<T, DiffKey<keyof T, K>>>;
    };
}
