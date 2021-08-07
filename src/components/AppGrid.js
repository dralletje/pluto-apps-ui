import React from "react"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

import GridLayout from "react-grid-layout"
import { CellOutput } from "./CellOutput"
import styled from "styled-components"
import useMeasure from "react-use-measure"
import { cl } from "../common/ClassTable"
import { PlutoContext } from "../common/PlutoContext"

/** @type {import("styled-components").StyledComponent<"div", null, { is_app_editor_open: boolean }>} */
let CellStyle = styled.div`
    overflow-x: hidden;
    overflow-y: auto;
    background-color: white;
    box-shadow: ${(p) => (p.is_app_editor_open ? "0px 0px 0px 4px #eee" : "none")};

    &.react-draggable-dragging {
        box-shadow: 0px 0px 0px 4px black;
    }

    &.highlighted {
        filter: sepia() hue-rotate(242deg) saturate(10);
    }

    & > .app-output-container {
        pointer-events: ${(p) => (p.is_app_editor_open ? "none" : "auto")};
        position: relative;
        z-index: 0;
        width: 100%;
        height: 100%;
    }

    pluto-output.rich_output {
        padding: 0;
        height: 100%;
        width: 100%;
    }

    .react-resizable-handle {
        background-color: rgba(255, 255, 255, 0.8);
    }
`

/**
 * @param {object} props
 * @param {import("./Editor").NotebookData} props.notebook
 * @param {boolean} props.is_app_editor_open
 * @param {any} props.on_is_app_editor_open_change
 */
export let AppGrid = ({ notebook, is_app_editor_open, on_is_app_editor_open_change }) => {
    const [ref, bounds] = useMeasure()
    let pluto_actions = React.useContext(PlutoContext)

    return (
        <div ref={ref} style={{ flex: 1, backgroundColor: "white", height: "100vh", overflowY: "auto" }}>
            <div style={{ padding: 16, backgroundColor: "#eee", position: "sticky", top: 0, zIndex: 10 }}>
                <button onClick={() => on_is_app_editor_open_change(!is_app_editor_open)}>Toggle sidebar</button>
            </div>

            {bounds.width !== 0 && (
                <GridLayout
                    className="layout"
                    // layout={layout}
                    style={{ padding: 8 }}
                    onLayoutChange={(new_layout) => {
                        console.log(`new_layout:`, new_layout)
                        pluto_actions.update_notebook((notebook) => {
                            for (let cell_layout of new_layout) {
                                let app_cell = notebook.app_cells[cell_layout.i]
                                app_cell.x = cell_layout.x
                                app_cell.y = cell_layout.y
                                app_cell.w = cell_layout.w
                                app_cell.h = cell_layout.h
                            }
                        })
                    }}
                    cols={6}
                    rowHeight={50}
                    width={bounds.width}
                    autoSize
                    isDraggable={is_app_editor_open}
                    isResizable={is_app_editor_open}
                >
                    {notebook.cell_order
                        .filter((cell_id) => notebook.app_cells[cell_id] != null)
                        .map((cell_id) => (
                            <CellStyle
                                key={cell_id}
                                className="pluto-app-cell"
                                id={`wrapper-for-${cell_id}`}
                                is_app_editor_open={is_app_editor_open}
                                data-grid={position_or_bust(notebook.app_cells[cell_id])}
                                data-pluto-is-running={notebook.cell_results[cell_id].running}
                                data-pluto-is-queued={notebook.cell_results[cell_id].queued}
                            >
                                <div className="app-output-container">
                                    <AppCell key={cell_id} cell_id={cell_id} result={notebook.cell_results[cell_id]} />
                                </div>
                            </CellStyle>
                        ))}
                </GridLayout>
            )}

            <div style={{ minHeight: 200 }} />
        </div>
    )
}

let position_or_bust = (app_cell) => {
    if (app_cell.x != null && app_cell.y != null && app_cell.w != null && app_cell.h != null) {
        return app_cell
    } else {
        return undefined
    }
}

let AppCell = ({ result, cell_id }) => {
    return <CellOutput {...result.output} cell_id={cell_id} />
}
