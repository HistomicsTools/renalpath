import pytest
from girder.plugin import loadedPlugins


@pytest.mark.plugin('renalpath')
def test_import(server):
    assert 'renalpath' in loadedPlugins()
