import $ from 'jquery';
import _ from 'underscore';

import { restRequest } from '@girder/core/rest';
import { wrap } from '@girder/core/utilities/PluginUtils';

import MetadataPlot from '@girder/histomicsui/panels/MetadataPlot';

wrap(MetadataPlot, 'onHover', function (onHover, event) {
    let results = onHover.apply(this, _.rest(arguments, 1));
    if (event && event.points && event.points.length >= 1 && event.points[0].pointIndex !== undefined) {
        const idx = event.points[0].pointIndex;
        let image;
        if (this.lastPlotData.data[idx]._roots) {
            const roots = this.lastPlotData.data[idx]._roots;
            Object.entries(roots).forEach(([key, value]) => {
                if (!image && value.image_id && value.Min_x_coord !== undefined && value.Max_x_coord !== undefined && value.Min_y_coord !== undefined && value.Min_y_coord !== undefined) {
                    image = {
                        id: value.image_id,
                        left: value.Min_x_coord,
                        top: value.Min_y_coord,
                        right: value.Max_x_coord,
                        bottom: value.Max_y_coord
                    };
                }
            });
        } else {
            image = this.lastPlotData.data[idx].image;
        }
        if (image && (!this.lastPlotData._images || !this.lastPlotData._images[image.id])) {
            this.lastPlotData._images = this.lastPlotData._images || {};
            if (!this.lastPlotData._images[image.id]) {
                this.lastPlotData._images[image.id] = restRequest({
                    url: 'item', data: {folderId: this.parentFolderId, text: `"${image.id}"`}, error: null});
            }
        }
        if (image) {
            this._lastThumbnailRegionPromise = this.lastPlotData._images[image.id];
            this._lastThumbnailRegionPromise.done((items) => {
                if (this.lastPlotData._images[image.id] !== this._lastThumbnailRegionPromise || !items || items.length !== 1 || $('svg g.hoverlayer').length === 0) {
                    return;
                }
                const regionUrl = `api/v1/item/${items[0]._id}/tiles/region?width=100&height=100&left=${image.left}&top=${image.top}&right=${image.right}&bottom=${image.bottom}`;
                let x = parseFloat($('svg g.hoverlayer g.hovertext text[x]').attr('x'));
                let y = parseFloat($('svg g.hoverlayer g.hovertext text[y]').attr('y'));
                x = x === 0 ? -50 : x < 0 ? x - 100 : x;
                let d = $('svg g.hoverlayer g.hovertext path[d]').attr('d');
                if (d && (d.split('L6,').length >= 2 || d.split('L-6,').length >= 2)) {
                    let y2 = parseFloat(d.split('v')[2]);
                    y += Math.abs(y2) - 100 - 13;
                } else if (d && d.split('v').length === 2) {
                    let y2 = parseFloat(d.split('v')[1]);
                    y += Math.abs(y2) - 100 - 13;
                } else {
                    y = -3;
                }
                $('svg g.hoverlayer g.hovertext image.hoverthumbnail').remove();
                $('svg g.hoverlayer g.hovertext').html($('svg g.hoverlayer g.hovertext').html() + `<image class="hoverthumbnail" href="${regionUrl}" x="${x}px" y="${y}px" width="100px" height="100px"/>`);
            });
        }
    }
    return results;
});

wrap(MetadataPlot, 'adjustHoverText', function (adjustHoverText, d, parts, plotData) {
    let image;
    if (plotData === undefined) {
        const roots = d._roots;
        Object.entries(roots).forEach(([key, value]) => {
            if (!image && value.image_id && value.Min_x_coord !== undefined && value.Max_x_coord !== undefined && value.Min_y_coord !== undefined && value.Min_y_coord !== undefined) {
                image = {
                    id: value.image_id,
                    left: value.Min_x_coord,
                    top: value.Min_y_coord,
                    right: value.Max_x_coord,
                    bottom: value.Max_y_coord
                };
            }
        });
    } else {
        if (plotData.colDict['_0_item.name'] && plotData.colDict['_bbox.x0'] && plotData.colDict['_bbox.x1'] && plotData.colDict['_bbox.y0'] && plotData.colDict['_bbox.y1'] && d[plotData.colDict['_0_item.name'].index] !== undefined && d[plotData.colDict['_bbox.x0'].index] !== undefined && d[plotData.colDict['_bbox.y0'].index] !== undefined && d[plotData.colDict['_bbox.x0'].index] !== undefined && d[plotData.colDict['_bbox.y1'].index] !== undefined) {
            image = {
                id: d[plotData.colDict['_0_item.name'].index],
                left: d[plotData.colDict['_bbox.x0'].index],
                top: d[plotData.colDict['_bbox.y0'].index],
                right: d[plotData.colDict['_bbox.x1'].index],
                bottom: d[plotData.colDict['_bbox.y1'].index]
            };
            d.image = image;
        }
    }
    if (image) {
        for (let i = 0; i < 6; i += 1) {
            parts.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
        }
    }
    return adjustHoverText.apply(this, _.rest(arguments, 1));
});
