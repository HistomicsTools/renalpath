import ImageView from '@girder/histomicsui/views/body/ImageView';
import { wrap } from '@girder/core/utilities/PluginUtils';
import _ from 'underscore';
// import events from '@girder/histomicsui/events';

import ElementDataPanel from './ElementDataPanel';

wrap(ImageView, 'initialize', function (initialize) {
    this.dataPanel = new ElementDataPanel({
        parentView: this
    });

    initialize.apply(this, _.rest(arguments));
    this.allowClickSelection = true;
    this.noAutoRegionContextMenu = true;
});

wrap(ImageView, 'render', function (render) {
    render.call(this);
    if (this.model.id) {
        if (!this.$('.h-elementdata-widget').length) {
            this.$('.h-control-panel-container')
                .removeClass('hidden')
                .append('<div id="h-elementdata-panel" class="h-elementdata-widget s-panel"></div>');
        }
        this.dataPanel
            .setItem(this.model)
            .setElement('.h-elementdata-widget')
            .render();
    }
});
