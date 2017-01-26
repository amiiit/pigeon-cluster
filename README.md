__pigeon-cluster - Cluster component for pigeon-maps__

pigeon-cluster was designed to be easy to use in your application:

```ecmascript 6
import Map from 'pigeon-maps'
import Cluster from 'pigeon-cluster'
import Marker from 'pigeon-marker'

const coordinates = [
    [lat,lng],
    [lat,lng],
    [lat,lng]
    ...
]
<Map center={[50.879, 4.6997]}
     zoom={4}
     width={600}
     height={400}>
    <Cluster>
        {
            coordinates.map(coordinate => <Marker key={coordinate.toString()} anchor={coordinate} payload={1}/>)
        }
    </Cluster>
</Map>

```

This library used optimized data-structures for handling the cluster complexity for you. In order for this to work you must set a `key` attribute to any child component you pass down to the `Cluster` component. If you don't know what to use as a key and your points are uniquer, you could use the coordinate itself as a key in the following way:
```
const coordinate = [34.50,5.3333]
const key = coordinate.toString() // '34.5,5.3333'
const marker = <Marker key={key} anchor={coordinate}></Marker>
```