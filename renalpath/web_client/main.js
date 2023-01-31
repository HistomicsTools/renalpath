import { registerPluginNamespace } from '@girder/core/pluginUtils';

import * as renalpath from './index';

const pluginName = 'renalpath';

registerPluginNamespace(pluginName, renalpath);
