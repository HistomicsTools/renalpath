import { wrap } from '@girder/core/utilities/PluginUtils';

import AnnotationPopover from '@girder/histomicsui/views/popover/AnnotationPopover';

/**
 * This shows cell types based on very specific metadata that might be present
 * on an annotation.
 */
wrap(AnnotationPopover, '_elementAdditionalValues', function (_elementAdditionalValues, element, annotation) {
    let results = _elementAdditionalValues.call(this) || '';
    if (element._additionalValues !== undefined) {
        return element._additionalValues;
    }
    element._additionalValues = null;
    let ctypes;
    const topkey = 'Main_Cell_Types';
    const user = element.get('user') || {};
    if (user[topkey]) {
        ctypes = element.get('user')[topkey];
    } else {
        const attrib = annotation.get('annotation').attributes;
        if (!attrib || !attrib[topkey]) {
            return results;
        }
        ctypes = attrib[topkey][element.id];
    }
    if (ctypes) {
        let values = Object.keys(ctypes).filter((key) => ctypes[key] && ctypes[key] >= 0.0005).sort((a, b) => ctypes[b] - ctypes[a]).map((key) => `${key}: ${ctypes[key].toFixed(3)}`);
        if (values.length) {
            results += '<div>' + values.join('</div><div>') + '</div>';
        }
    }
    Object.keys(user).filter((key) => user[key].substr || (user[key].toFixed && Math.abs(user[key]) >= 0.0005)).sort().forEach((key) => {
        const val = user[key].toFixed ? user[key].toFixed(3) : ('' + user[key]);
        if (val) {
            results += `<div>${key}: ${val}</div>`;
        }
    });
    element._additionalValues = results;
    return results;
});
