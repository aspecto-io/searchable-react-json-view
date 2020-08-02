"use strict"

//import react and reactDom for browser rendering
import React from "react"
import ReactDom from "react-dom"

import Moment from "moment"

//import the react-json-view component (installed with npm)
import JsonViewer from "./../../src/js/index"

const App = () => {
    const [search, setSearch] = React.useState('IS A')

    return <div>
        Search: <input value={search} onChange={e => setSearch(e.target.value)} />
        <JsonViewer
            highlightSearch={search}
            style={{ padding: "30px", backgroundColor: "white" }}
            src={getExampleJson1()}
            collapseStringsAfterLength={12}
            displayObjectSize={true}
            name={"dev-server"}
            displayDataTypes={false}
            shouldCollapse={({ src, namespace, type }) => {
                if (type === "array" && src.indexOf("test") > -1) {
                    return true
                } else if (namespace.indexOf("moment") > -1) {
                    return true
                }
                return false
            }}
            defaultValue=""
            theme={{
                base00: 'rgba(0, 0, 0, 0)',
                base01: 'rgb(245, 245, 245)',
                base02: 'rgb(235, 235, 235)',
                base03: '#9e9e9e',
                base04: 'rgba(0, 0, 0, 0.3)',
                base05: '#616161',
                base06: '#424242',
                base07: '#212121',
                base08: '#880e4f', // No idea!!
                base09: '#304FFE', // String
                base0A: '#880e4f', // Null
                base0B: '#00A4D3', // float
                base0C: '#212121', // Array numbers
                base0D: '#616161', // Date and open
                base0E: '#c224ff',
                base0F: '#00A4D3',
            }}
        /></div>
}

//render 2 different examples of the react-json-view component
ReactDom.render(
    <App />,
    document.getElementById("app-container")
)

/*-------------------------------------------------------------------------*/
/*     the following functions just contain test json data for display     */
/*-------------------------------------------------------------------------*/

//just a function to get an example JSON object
function getExampleJson1() {
    return {
        string: "this is a test string",
        integer: 42,
        empty_array: [],
        empty_object: {},
        array: [1, 2, 3, "test"],
        float: -2.757,
        undefined_var: undefined,
        parent: {
            sibling1: true,
            sibling2: false,
            sibling3: null,
        },
        string_number: "1234",
        moment: {
            a: 'shlomi',
            b: 'nir',
            c: {
                name: 'amir',
                d: [{
                    name: 'michael eran'
                }]
            }
        },
        date: new Date(),
        regexp: /[0-9]/gi
    }
}