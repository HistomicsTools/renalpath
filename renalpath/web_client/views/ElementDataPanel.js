import _ from 'underscore';
import $ from 'jquery';

import Panel from '@girder/slicer_cli_web/views/Panel';
// import FolderModel from '@girder/core/models/FolderModel';

import elementDataPanel from '../templates/elementDataPanel.pug';

import '../stylesheets/elementDataPanel.styl';

const ElementDataPanel = Panel.extend({
    initialize(settings) {
        this.settings = settings;
        this.plotConfig = {};
    },
    render() {
        if (!this._bound && this.parentView.selectedElements) {
            this.listenTo(this.parentView.selectedElements, 'add remove reset', this._update);
            this._bound = true;
        }
        const elements = this.parentView.selectedElements;
        const average = this._averageElements(elements);
        if (!average || !((average || {}).average || {}).Main_Cell_Types) {
            this.$el.addClass('hidden');
        } else {
            $.when(
                !window.Plotly
                    ? $.ajax({ // like $.getScript, but allow caching
                        url: 'https://cdn.plot.ly/plotly-latest.min.js',
                        dataType: 'script',
                        cache: true
                    })
                    : null
            ).done(() => {
                this.$el.html(elementDataPanel({
                    id: 'elementdata-panel',
                    elements: elements,
                    average: average.average,
                    record: average,
                    count: elements.length,
                    formatNumber: this._formatNumber
                }));
                this.$el.removeClass('hidden');
                this.lastPlotData = this.getPlotData(this.plotConfig, average.average);
                const elem = this.$el.find('.h-metadata-plot-area');
                let plotOptions = {
                    margin: {t: 0, l: 40, r: 0, b: 20},
                    hovermode: 'closest',
                    paper_bgcolor: 'transparent',
                    plot_bgcolor: 'transparent',
                    height: 200
                };
                window.Plotly.newPlot(elem[0], this.lastPlotData, plotOptions);
            });
        }
    },
    setItem: function (item) {
        this.item = item;
        this.render();
        return this;
    },
    _update: function () {
        this.render();
    },
    _formatNumber: function (val) {
        let digits = Math.min(3, Math.max(0, 3 - Math.floor(Math.log10(Math.abs(val)))));
        return val.toFixed(digits);
    },
    _averageElementsRecurse: function (props, count, record, first) {
        if (_.isArray(props)) {
            props.forEach((entry) => {
                record = this._averageElementsRecurse(entry, props.length, record);
            });
            return record;
        }
        if (!record) {
            record = {count: count, average: {}, uniform: {}, sum: {}, min: {}, max: {}};
            first = true;
        }
        if (props === null || props === undefined) {
            return record;
        }
        Object.entries(props).forEach(([key, value]) => {
            if (value === null || value === undefined) {
                return;
            }
            if (!value.substr && Object.keys(value).length) {
                const keyrec = {
                    average: record.average[key] || {},
                    uniform: record.uniform[key] || {},
                    sum: record.sum[key] || {},
                    min: record.sum[key] || {},
                    max: record.sum[key] || {}
                };
                this._averageElementsRecurse(value, count, keyrec, first);
                if (Object.keys(keyrec.average).length) {
                    record.average[key] = keyrec.average;
                }
                if (Object.keys(keyrec.uniform).length && first) {
                    record.uniform[key] = keyrec.uniform;
                }
                if (Object.keys(keyrec.sum).length) {
                    record.sum[key] = keyrec.sum;
                }
                if (Object.keys(keyrec.min).length) {
                    record.min[key] = keyrec.min;
                }
                if (Object.keys(keyrec.max).length) {
                    record.max[key] = keyrec.max;
                }
            } else {
                if (!first && record.uniform[key] !== value) {
                    delete record.uniform[key];
                }
                if (_.isFinite(value) && +value && value.toFixed) {
                    record.average[key] = (record.average[key] || 0) + (+value) / count;
                    record.sum[key] = (record.sum[key] || 0) + (+value);
                    if (first) {
                        record.uniform[key] = +value;
                    }
                    record.min[key] = Math.min(record.min[key] === undefined ? +value : record.min[key], +value);
                    record.max[key] = Math.max(record.max[key] === undefined ? +value : record.max[key], +value);
                } else if (value.substr) {
                    if (first) {
                        record.uniform[key] = value;
                    }
                }
            }
        });
        return record;
    },
    _averageElements: function (elements) {
        if (!elements || !elements.length) {
            return;
        }
        return this._averageElementsRecurse(elements.models.map((e) => e.get('user')));
    },
    getPlotData: function (plotConfig, average) {
        const ctypes = average.Main_Cell_Types;
        const keys = Object.keys(ctypes).filter((key) => ctypes[key]).sort((a, b) => ctypes[b] - ctypes[a]);
        var data = [{
            values: keys.map((key) => +ctypes[key]),
            labels: keys,
            type: 'pie',
            marker: {
                colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'] // colorBrewerPaired12
            },
            domain: {
                row: 0,
                column: 0
            },
            hoverinfo: 'label+percent',
            textinfo: 'none'
        }];
        return data;
    }
});

export default ElementDataPanel;
