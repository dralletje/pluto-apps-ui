import { createContext } from "../imports/Preact.js"

export let PlutoContext = createContext({
    get_notebook: () => /** @type {import("../components/Editor.js").NotebookData} */ (null),
    send: (...args) => null,
    //@ts-ignore
    update_notebook: (/** @type {(notebook: import("../components/Editor.js").NotebookData) => void} */ fn) => null,

    add_deserialized_cells: /** @type {any} */ (null),
    add_remote_cell_at: /** @type {any} */ (null),
})
export let PlutoBondsContext = createContext(/** @type {{ [key: string]: { value: any } }} */ (null))
export let PlutoJSInitializingContext = createContext(null)
