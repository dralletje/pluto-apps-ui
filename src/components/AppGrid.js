import React from "react"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

import GridLayout from "react-grid-layout"
import { CellOutput } from "./CellOutput"
import styled from "styled-components"
import useMeasure from "react-use-measure"

/** @type {import("styled-components").StyledComponent<"div", null, { is_app_editor_open: boolean }>} */
let CellStyle = styled.div`
    overflow: hidden;
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

export let AppGrid = ({ is_app_editor_open, on_is_app_editor_open_change, notebook }) => {
    const [ref, bounds] = useMeasure()

    return (
        <div ref={ref} style={{ flex: 1, backgroundColor: "white" }}>
            <div style={{ padding: 16, backgroundColor: "#eee" }}>
                <button onClick={() => on_is_app_editor_open_change(!is_app_editor_open)}>Toggle sidebar</button>
            </div>

            {bounds.width !== 0 && (
                <GridLayout
                    className="layout"
                    // layout={layout}
                    style={{ padding: 8 }}
                    onLayoutChange={() => {}}
                    cols={6}
                    rowHeight={50}
                    width={bounds.width}
                    autoSize
                    isDraggable={is_app_editor_open}
                    isResizable={is_app_editor_open}
                >
                    {notebook.cell_order
                        .filter((cell_id) => notebook.cell_inputs[cell_id].is_in_app)
                        .map((cell_id) => (
                            <CellStyle key={cell_id} id={`wrapper-for-${cell_id}`} is_app_editor_open={is_app_editor_open}>
                                <div className="app-output-container">
                                    <AppCell key={cell_id} cell_id={cell_id} result={notebook.cell_results[cell_id]} />
                                </div>
                            </CellStyle>
                        ))}
                </GridLayout>
            )}
        </div>
    )
}

let AppCell = ({ result, cell_id }) => {
    return <CellOutput {...result.output} cell_id={cell_id} />
}
