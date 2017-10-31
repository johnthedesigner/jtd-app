import uuid from 'uuid'

import { layerTypes } from './constants'

export default {
  id: 'test',
  title: 'Capitalize on low hanging fruit',
  excerpt: 'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.',
  featuredStyles: {
    bgGradientStart: '#0BE7B7',
    bgGradientEnd: '#8FFFE7',
    buttonFill: '#21967D',
    titleColor: 'white',
    excerptColor: '#21967D'
  },
  nonfeaturedStyles: {
    buttonFill: '#999999',
    titleColor: '#21967D'
  },
  layers: [
    {
      id: uuid.v1(),
      type: layerTypes.rectangle,
      title: 'rectangle',
      order: 0,
      dimensions: {
        x: 400,
        y: 400,
        width: 300,
        height: 150,
        rotation: 15,
        scaleX: 1,
        scaleY: 1
      },
      adjustments: {
        fill: {
          type: 'color',
          color: 'rgba(45,156,219,1)'
        }
      },
    }
  ],
  selections: [],
  activeFlyout: null
}
