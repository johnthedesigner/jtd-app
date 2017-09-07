import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Layer from '../Routes/Editor/components/layers/Layer'
import layerConstants from '../Routes/Editor/components/layers/layerConstants'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

let textLayer = {
  id: 2,
  type: layerConstants.layerTypes.text,
  title: 'text 1',
  text: 'Lorem ipsum dolor sit amet',
  adjustments: {
    type: {
      color: '#F00',
      fontFamily: layerConstants.text.fontFamilies.helvetica
    },
    dimensions: {
      x: 350,
      y: 300,
      width: 200,
      height: 100,
      scaleX: 1,
      scaleY: 1,
      rotation: 0
    }
  }
}
storiesOf('Text Layer', module)
  .add('with text', () => <Layer layer={textLayer} setLayerAdjustment={action('adjustment')}/>)
