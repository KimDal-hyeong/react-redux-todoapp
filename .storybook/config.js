import { configure, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';
import { setOptions } from '@storybook/addon-options';

import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

import './storybook.css';

setAddon(infoAddon);

const req = require.context('../src', true, /\.stories\.jsx$/);

setOptions({
  name: 'DENNIS TODOS APP',
});

function loadStories() {
  req.keys().forEach(path => req(path));
}

configure(loadStories, module);
