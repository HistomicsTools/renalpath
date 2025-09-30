import importlib.metadata
import logging

from girder import plugin

try:
    __version__ = importlib.metadata.version(__name__)
except importlib.metadata.PackageNotFoundError:
    # package is not installed
    pass


logger = logging.getLogger(__name__)

# See http://docs.python.org/3.3/howto/logging.html#configuring-logging-for-a-library
logging.getLogger(__name__).addHandler(logging.NullHandler())


class GirderPlugin(plugin.GirderPlugin):
    DISPLAY_NAME = 'Renal Pathology Tools'
    CLIENT_SOURCE_PATH = 'web_client'

    def load(self, info):
        plugin.getPlugin('histomicsui').load(info)
