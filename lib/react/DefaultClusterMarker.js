'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = DefaultClusterMarker;

var _infact = require('./infact');

var colors = {
    small: ['rgba(181, 226, 140, 0.6)', 'rgba(110, 204, 57, 0.7)'],
    medium: ['rgba(241, 211, 87, 0.6)', 'rgba(240, 194, 12, 0.7)'],
    big: ['rgba(253, 156, 115, 0.6)', 'rgba(241, 128, 23, 0.7)']
};
var defaultCountToColor = function (count) {
    return count > 20 ? colors.big : count > 7 ? colors.medium : colors.small;
};

var styleFromCount = function (count) {
    var colors = defaultCountToColor(count);
    return {
        width: 30,
        height: 30,
        borderRadius: '50%',
        borderWidth: 3,
        borderColor: colors[0],
        borderStyle: 'solid',
        background: colors[1],
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        cursor: 'default'
    };
};

function DefaultClusterMarker(_ref) {
    var pixelOffset = _ref.pixelOffset,
        count = _ref.count;

    return _infact.React.createElement('div', { style: Object.assign(styleFromCount(count), {
            left: pixelOffset[0],
            top: pixelOffset[1]
        }) }, count);
}