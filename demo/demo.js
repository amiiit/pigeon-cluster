import {React, Inferno, Component} from '../src/infact'

import Map from 'pigeon-maps/infact'
import Cluster from 'pigeon-cluster'
import Marker from 'pigeon-marker/infact'
import coords from './5000coords.js'

const featuresLatLng = coords.lngLats.map(lngLat => [lngLat[1], lngLat[0]])

export default class Demo extends Component {

    constructor (props) {
        super(props)
        this.state = {
            displayPoints: featuresLatLng.length
        }
    }
    addPoints = () => {
        this.updatePointsCount(100)
    }

    removePoints = () => {
        this.updatePointsCount(-100)
    }

    updatePointsCount (diff) {
        this.setState({
            displayPoints: Math.max(0, Math.min(this.state.displayPoints + diff, featuresLatLng.length))
        })
    }

    handleMapBoundsChanged = (e) => {
        this.setState({
            mapBounds: e.bounds,
            mapCenter: e.center,
            mapZoom: e.zoom
        })
    }

    handleMapClick = (e) => {
        console.log(JSON.stringify(e.latLng))
    }

    render () {
        const pointsToDisplay = featuresLatLng.slice(0, this.state.displayPoints)
        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{display: 'flex', justifyContent: 'space-between', width: 500, margin: '0 auto', padding: 16}}>
                    <button onClick={this.addPoints}>Add points</button>
                    <button onClick={this.removePoints}>Remove points</button>
                    <p>{this.state.displayPoints} Points</p>
                    <p>{JSON.stringify(this.state.mapBounds)}</p>
                </div>
                <Map center={this.state.mapCenter || [50.879, 4.6997]}
                     zoom={this.state.mapZoom || 4}
                     width={600}
                     onClick={this.handleMapClick}
                     onBoundsChanged={this.handleMapBoundsChanged}
                     height={400}>
                    <Cluster>
                        {
                            pointsToDisplay.map(f => <Marker key={f.toString()} anchor={f} payload={1}/>)
                        }
                    </Cluster>
                </Map>
            </div>
        )
    }
}