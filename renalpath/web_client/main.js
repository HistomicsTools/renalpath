import { registerPluginNamespace } from '@girder/core/pluginUtils';

// Import modules for side effects.
import './views/ImageView';

import * as renalpath from './index';

const pluginName = 'renalpath';

registerPluginNamespace(pluginName, renalpath);
