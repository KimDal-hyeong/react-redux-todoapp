import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextForm from './TextForm';

storiesOf('TextForm', module)
  .add('default', () => (
    <TextForm
      className="new-todo"
      placeholder="TextForm placeholder"
      onSubmit={action('submitted')}
    />
  ));