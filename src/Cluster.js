import {React, Inferno, Component, PropTypes} from './infact'
import supercluster from 'supercluster'
import DefaultClusterMarker from './DefaultClusterMarker'
const cloneElement = process.env.BABEL_ENV === 'inferno' ? Inferno.cloneVNode : React.cloneElement

const [iLNG, iLAT] = [0, 1]

export default function Cluster (props) {
    if (!Array.isArray(props.children)) {
        return props.children
    }
    const {
        mapState,
        pixelToLatLng,
        latLngToPixel,
        children,
        clusterMarkerRadius = 40,
        maxZoom = 16
    } = props

    const markers = children.map(function (marker) {
        const pixel = latLngToPixel(marker.props.anchor)
        return cloneElement(marker, {
            pixelToLatLng,
            latLngToPixel,
            left: pixel[0],
            top: pixel[1]
        })
    });

    const pointsForClustering = markers.map((marker) => {
        return {
            vNode: marker,
            geometry: {
                coordinates: marker.props.anchor
            }
        }
    });

    const index = supercluster({
        radius: clusterMarkerRadius,
        maxZoom
    });

    index.load(pointsForClustering);
    const { ne, sw } = mapState.bounds
    const [westLng, southLat, eastLng, northLat] = [sw[iLNG], sw[iLAT], ne[iLNG], ne[iLAT]];
    const markersAndClusters = index.getClusters([westLng, southLat, eastLng, northLat], Math.floor(mapState.zoom))
    const displayElements = markersAndClusters.map(markerOrCluster => {
        let displayElement
        const isCluster = markerOrCluster && markerOrCluster.properties && markerOrCluster.properties.cluster
        if (isCluster) {
            const pixelOffset = latLngToPixel(markerOrCluster.geometry.coordinates)
            const clusterElementKey = markerOrCluster.geometry.coordinates.toString()
            displayElement = <DefaultClusterMarker key={clusterElementKey}
                                                   count={markerOrCluster.properties.point_count}
                                                   pixelOffset={pixelOffset} />
        } else {
            displayElement = markerOrCluster.vNode
        }
        return displayElement
    })

    return (
        <div className={props.className || ''}
             style={{ position: 'absolute', height: mapState.height, width: mapState.width }}>
            {displayElements}
        </div>
    )
}



