import { html, useEffect, useState, useContext, useRef } from "../imports/Preact.js"
import { cl } from "../common/ClassTable.js"
import { PlutoContext } from "../common/PlutoContext.js"
import { is_mac_keyboard } from "../common/KeyboardShortcuts.js"

export const Preamble = ({ any_code_differs, last_update_time }) => {
    let pluto_actions = useContext(PlutoContext)

    const [state, set_state] = useState("")
    const timeout_ref = useRef(null)

    useEffect(() => {
        clearTimeout(timeout_ref?.current)
        if (any_code_differs) {
            set_state("ask_to_save")
        } else {
            if (Date.now() - last_update_time < 1000) {
                set_state("saved")
                timeout_ref.current = setTimeout(() => {
                    set_state("")
                }, 1000)
            } else {
                set_state("")
            }
        }
        return () => clearTimeout(timeout_ref?.current)
    }, [any_code_differs])

    return html`<pluto-preamble>
        ${state === "ask_to_save"
            ? html`
                  <div id="saveall-container" className=${state}>
                      <button
                          onClick=${() => {
                              set_state("saving")
                              pluto_actions.set_and_run_all_changed_remote_cells()
                          }}
                          className=${cl({ runallchanged: true })}
                          title="Save and run all changed cells"
                      >
                          <span className="only-on-hover"><b>Save all changes</b> </span>${is_mac_keyboard
                              ? html`<kbd>⌘ S</kbd>`
                              : html`<kbd>Ctrl</kbd>+<kbd>S</kbd>`}
                      </button>
                  </div>
              `
            : // : state === "saving"
            // ? html` <div id="saveall-container" className=${state}>Saving... <span className="saving-icon"></span></div> `
            state === "saved" || state === "saving"
            ? html`
                  <div id="saveall-container" className=${state}>
                      <span><span className="only-on-hover">Saved </span><span className="saved-icon"></span></span>
                  </div>
              `
            : null}
    </pluto-preamble>`
}
