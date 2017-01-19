import {React, Inferno, Component} from '../src/infact'

import Map from 'pigeon-maps/infact'
import Cluster from 'pigeon-cluster'
import Marker from 'pigeon-marker/infact'
import coords from './5000coords.js'

export default class Demo extends Component {
    render () {
        return (
            <div style={{ textAlign: 'center', marginTop: 50 }}>
                <Map center={[50.879, 4.6997]}
                     zoom={4}
                     width={600}
                     height={400}>
                    <Cluster>
                        {
                            coords.features.map(f => <Marker key={f.toString()} anchor={f} payload={1}/>)
                        }
                    </Cluster>
                </Map>
            </div>
        )
    }
}
