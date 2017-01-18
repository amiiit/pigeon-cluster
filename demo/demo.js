import {React, Inferno, Component} from '../src/infact'

import Map from 'pigeon-maps/infact'
import Cluster from 'pigeon-cluster'
import Marker from 'pigeon-marker/infact'

export default class Demo extends Component {
    render () {
        return (
            <div style={{ textAlign: 'center', marginTop: 50 }}>
                <Map center={[50.879, 4.6997]}
                     zoom={11}
                     width={600}
                     height={400}>
                    <Cluster>
                        <Marker key='m1' anchor={[50.889, 4.6997]} payload={1}/>
                        <Marker key='m2' anchor={[50.879, 4.7]} payload={1}/>
                        <Marker key='m3' anchor={[50.869, 4.72]} payload={1}/>
                    </Cluster>
                </Map>
            </div>
        )
    }
}
