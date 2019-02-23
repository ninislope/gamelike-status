import * as React from "react";
import { observer, Provider } from "mobx-react";
import styles from './App.module.css';
import { Store } from '../Store';
import { CharacterSelector } from "./CharacterSelector";
import { TypeValuesView } from "./TypeValuesView";

export const App = observer<React.SFC<{store: Store}>>(({store}) =>
    store.dataId && store.dataUid ?
    <>
        <header className={styles.header}>
            <h1>ゲーム風ステータス</h1>
            <div><a href="/">新しくステータスを作る</a></div>
            <div>
                {
                    store.loginUid ? (
                        store.loginUid === store.dataUid && (
                            store.ui.editable ?
                            <button onClick={() => store.trySave()}>保存</button> :
                            <button onClick={() => store.tryEdit()}>編集</button>
                        )
                    ) :
                    <button onClick={() => store.tryLogin()}>ログイン</button>
                }
                {false && <button onClick={() => downloadFile(JSON.stringify(store.toJSON(), null, "  "))}>ダウンロード</button>}
                <button onClick={() => share()}>シェア</button>
            </div>
            <label>
                <input type="radio" checked={store.ui.viewMode === "characters"} onChange={() => store.ui.viewMode = "characters"} />
                キャラクターステータス
            </label>
            <label>
                <input type="radio" checked={store.ui.viewMode === "typeValues"} onChange={() => store.ui.viewMode = "typeValues"} />
                ステート一覧
            </label>
        </header>
        <Provider store={store}>
            <Provider ui={store.ui}>
                <main className={styles.main}>
                    {
                        store.ui.viewMode === "characters" ? <CharacterSelector/> : <TypeValuesView/>
                    }
                </main>
            </Provider>
        </Provider>
    </> :
    <>
        <header className={styles.header}>
            <h1>ゲーム風ステータス</h1>
            {
                store.loginUid ?
                <><label>IDを決める</label><input id="id"/><button onClick={() => store.setId((document.getElementById("id") as HTMLInputElement).value)}>決定</button></> :
                <button onClick={() => store.tryLogin()}>ログイン</button>
            }
        </header>
    </>
);

function downloadFile(str: string) {
    const url = URL.createObjectURL(new Blob([str]));
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = "data.json";
    a.click();
    a.remove();
}

function share() {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = `https://twitter.com/share?url=${encodeURIComponent(location.href)}`;
    a.target = "_blank";
    a.click();
    a.remove();
}
