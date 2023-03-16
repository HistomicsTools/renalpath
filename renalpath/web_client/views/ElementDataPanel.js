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
                    uniform: average.uniform,
                    count: elements.length
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
    _averageElementsRecurse: function (props, avg, uni, sum, count, first) {
        if (props === null || props === undefined) {
            return;
        }
        Object.entries(props).forEach(([key, value]) => {
            if (value === null || value === undefined) {
                return;
            }
            if (!value.substr && Object.keys(value).length) {
                let keyavg = avg[key] || {};
                let keyuni = uni[key] || {};
                let keysum = sum[key] || {};
                this._averageElementsRecurse(value, keyavg, keyuni, keysum, count, first);
                if (Object.keys(keyavg).length) {
                    avg[key] = keyavg;
                }
                if (Object.keys(keyuni).length && first) {
                    uni[key] = keyuni;
                }
                if (Object.keys(keysum).length) {
                    sum[key] = keysum;
                }
            } else {
                if (!first && uni[key] !== value) {
                    delete uni[key];
                }
                if (_.isFinite(value) && +value) {
                    avg[key] = (avg[key] || 0) + (+value) / count;
                    sum[key] = (sum[key] || 0) + (+value);
                    if (first) {
                        uni[key] = +value;
                    }
                } else if (value.substr) {
                    if (first) {
                        uni[key] = value;
                    }
                }
            }
        });
    },
    _averageElements: function (elements) {
        if (!elements || !elements.length) {
            return;
        }
        const count = elements.length;
        const result = {average: {}, uniform: {}, sum: {}, count: count};
        elements.models.forEach((e, idx) => {
            this._averageElementsRecurse(e.get('user'), result.average, result.uniform, result.sum, count, !idx);
        });
        return result;
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
