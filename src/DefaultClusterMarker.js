import { React, Inferno, Component } from './infact'

export default function DefaultClusterMarker ({ pixelOffset }) {
    return (
        <div style={{
            width: 10,
            height: 10,
            borderRadius: 50,
            background: 'red',
            position: 'absolute',
            left: pixelOffset[0],
            top: pixelOffset[1]
        }}></div>
    )
}