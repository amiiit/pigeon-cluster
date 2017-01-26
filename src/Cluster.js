import {React, Inferno, Component, PropTypes} from './infact'
import supercluster from 'supercluster'
import DefaultClusterMarker from './DefaultClusterMarker'
const cloneElement = process.env.BABEL_ENV === 'inferno' ? Inferno.cloneVNode : React.cloneElement

const [iLNG, iLAT] = [0, 1]

const ensureArray = (children = []) => {
    return Array.isArray(children) ? children : [children]
}
export default class Cluster extends Component {

    constructor (props) {
        super(props)
        this.state = {}
    }

    componentDidMount () {
        this.rebuildData(this.props)
    }

    rebuildData (props) {
        const pointsMap = this.generatePointsMap(props.children)
        const index = this.loadPoints(pointsMap)
        this.setState({
            pointsMap,
            index
        })
    }

    generatePointsMap (children) {
        const childrenArray = ensureArray(children)
        const pointsMap = {}

        childrenArray.forEach(child => {
            const { key } = child
            if (!key) {
                throw new Error('Markers must have a key property', child)
            }
            if (!child.props.anchor) {
                throw new Error('Markers must have an anchor property', child)
            }
            pointsMap[key] = {
                vNode: cloneElement(child, {
                    latLngToPixel: this.props.latLngToPixel,
                    pixelToLatLng: this.props.pixelToLatLng
                }),
                geometry: {
                    coordinates: child.props.anchor
                },
                id: key
            }
        })

        return pointsMap
    }

    loadPoints (pointsMap) {
        const index = supercluster({
            radius: this.props.clusterMarkerRadius || 40,
            maxZoom: this.props.maxZoom || 16
        });

        index.load(Object.keys(pointsMap).map(id => pointsMap[id]));
        return index
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.children !== this.props.children) {
            this.rebuildData(nextProps)
        }
    }

    render () {
        const { latLngToPixel, mapState, className } = this.props
        const { ne, sw } = mapState.bounds
        const [westLng, southLat, eastLng, northLat] = [sw[iLNG], sw[iLAT], ne[iLNG], ne[iLAT]];

        const markersAndClusters = this.state.index && this.state.index.getClusters([westLng, southLat, eastLng, northLat], Math.floor(mapState.zoom))

        const displayElements = (markersAndClusters || []).map(markerOrCluster => {
            let displayElement
            const isCluster = markerOrCluster && markerOrCluster.properties && markerOrCluster.properties.cluster
            const pixelOffset = latLngToPixel(markerOrCluster.geometry.coordinates)
            if (isCluster) {
                const clusterElementKey = markerOrCluster.geometry.coordinates.toString()
                displayElement = <DefaultClusterMarker key={clusterElementKey}
                                                       count={markerOrCluster.properties.point_count}
                                                       pixelOffset={pixelOffset}/>
            } else {
                displayElement = cloneElement(this.state.pointsMap[markerOrCluster.id].vNode, {
                    left: pixelOffset[0],
                    top: pixelOffset[1]
                })
            }
            return displayElement
        })

        return (
            <div className={className || ''}
                 style={{ position: 'absolute', height: mapState.height, width: mapState.width }}>
                {displayElements}
            </div>
        )
    }
}


