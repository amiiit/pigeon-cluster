'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Cluster;

var _infact = require('./infact');

var _supercluster = require('supercluster');

var _supercluster2 = _interopRequireDefault(_supercluster);

var _DefaultClusterMarker = require('./DefaultClusterMarker');

var _DefaultClusterMarker2 = _interopRequireDefault(_DefaultClusterMarker);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var cloneElement = _infact.Inferno.cloneVNode;

var iLNG = 0,
    iLAT = 1;
var createVNode = _infact.Inferno.createVNode;
function Cluster(props) {
    if (!Array.isArray(props.children)) {
        return props.children;
    }
    var mapState = props.mapState,
        pixelToLatLng = props.pixelToLatLng,
        latLngToPixel = props.latLngToPixel,
        children = props.children,
        _props$clusterMarkerR = props.clusterMarkerRadius,
        clusterMarkerRadius = _props$clusterMarkerR === undefined ? 100 : _props$clusterMarkerR,
        _props$maxZoom = props.maxZoom,
        maxZoom = _props$maxZoom === undefined ? 16 : _props$maxZoom;

    var markers = children.map(function (marker) {
        var pixel = latLngToPixel(marker.props.anchor);
        return cloneElement(marker, {
            pixelToLatLng: pixelToLatLng,
            latLngToPixel: latLngToPixel,
            left: pixel[0],
            top: pixel[1]
        });
    });

    var pointsForClustering = markers.map(function (marker) {
        return {
            vNode: marker,
            geometry: {
                coordinates: marker.props.anchor
            }
        };
    });

    var index = (0, _supercluster2.default)({
        radius: clusterMarkerRadius,
        maxZoom: maxZoom
    });

    index.load(pointsForClustering);
    var _mapState$bounds = mapState.bounds,
        ne = _mapState$bounds.ne,
        sw = _mapState$bounds.sw;
    var _ref = [sw[iLNG], sw[iLAT], ne[iLNG], ne[iLAT]],
        westLng = _ref[0],
        southLat = _ref[1],
        eastLng = _ref[2],
        northLat = _ref[3];

    var markersAndClusters = index.getClusters([westLng, southLat, eastLng, northLat], Math.floor(mapState.zoom));

    var displayElements = markersAndClusters.map(function (markerOrCluster) {
        var displayElement = void 0;
        var isCluster = markerOrCluster && markerOrCluster.properties && markerOrCluster.properties.cluster;
        if (isCluster) {
            var pixelOffset = latLngToPixel(markerOrCluster.geometry.coordinates);
            var clusterElementKey = markerOrCluster.geometry.coordinates.toString();
            displayElement = createVNode(16, _DefaultClusterMarker2.default, {
                'count': markerOrCluster.properties.point_count,
                'pixelOffset': pixelOffset
            }, null, null, clusterElementKey);
        } else {
            displayElement = markerOrCluster.vNode;
        }
        return displayElement;
    });

    return createVNode(2, 'div', {
        'className': props.className || '',
        'style': { position: 'absolute', height: mapState.height, width: mapState.width }
    }, displayElements);
}