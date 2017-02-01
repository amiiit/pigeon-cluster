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
                    coordinates: child.props.anchor.map(a => a).reverse() // [lng, lat]
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

        const points = Object.keys(pointsMap).map(id => pointsMap[id])
        index.load(points);
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
        const [west, south, east, north] = [sw[1], sw[0], ne[1], ne[0]];
        if (Math.abs(south) > 90 || Math.abs(north) > 90) {
            console.warn(`south or north are out of bounds. south: ${south}, north: ${north}`)
        }

        const markersAndClusters = this.state.index && this.state.index.getClusters([west, south, east, north], Math.floor(mapState.zoom))

        const displayElements = (markersAndClusters || []).map(markerOrCluster => {
            let displayElement
            const isCluster = markerOrCluster && markerOrCluster.properties && markerOrCluster.properties.cluster
            let pixelOffset
            if (isCluster) {
                pixelOffset = latLngToPixel(markerOrCluster.geometry.coordinates.map(a => a).reverse())
                const clusterElementKey = markerOrCluster.geometry.coordinates.toString()
                displayElement = <DefaultClusterMarker key={clusterElementKey}
                                                       count={markerOrCluster.properties.point_count}
                                                       pixelOffset={pixelOffset}/>
            } else {
                pixelOffset = latLngToPixel(markerOrCluster.vNode.props.anchor)
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


