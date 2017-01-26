import {React, Inferno, Component} from '../src/infact'

import Map from 'pigeon-maps/infact'
import Cluster from 'pigeon-cluster'
import Marker from 'pigeon-marker/infact'
import coords from './5000coords.js'

export default class Demo extends Component {

    constructor (props) {
        super(props)
        this.state = {
            displayPoints: coords.features.length
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
            displayPoints: Math.max(0, Math.min(this.state.displayPoints + diff, coords.features.length))
        })
    }

    render () {
        const pointsToDisplay = coords.features.slice(0, this.state.displayPoints)
        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{display: 'flex', justifyContent: 'space-between', width: 500, margin: '0 auto', padding: 16}}>
                    <button onClick={this.addPoints}>Add points</button>
                    <button onClick={this.removePoints}>Remove points</button>
                    <span>{this.state.displayPoints} Points</span>
                </div>
                <Map center={[50.879, 4.6997]}
                     zoom={4}
                     width={600}
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
