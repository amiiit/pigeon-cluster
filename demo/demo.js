import {React, Inferno, Component} from '../src/infact'

import Map from 'pigeon-maps/infact'
import Cluster from 'pigeon-cluster'
import Marker from 'pigeon-marker/infact'

export default class Demo extends Component {
    render () {
        return (
            <div style={{ textAlign: 'center', marginTop: 50 }}>
                <Map center={[50.879, 4.6997]}
                     zoom={12}
                     width={600}
                     height={400}>
                    <Cluster>
                        <Marker key='m1' anchor={[50.879, 4.6997]} payload={1}/>
                        <Marker key='m2' anchor={[50.779, 4.4997]} payload={1}/>
                        <Marker key='m3' anchor={[50.679, 4.5997]} payload={1}/>
                    </Cluster>
                </Map>
            </div>
        )
    }
}
