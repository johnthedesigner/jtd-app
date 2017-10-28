import uuid from 'uuid'

import { layerTypes } from './constants'

export default {
  id: 'fake',
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
      title: 'box 1',
      order: 0,
      adjustments: {
        fill: {
          backgroundColor: 'rgba(255,255,0,.5)'
        },
        dimensions: {
          x: 100,
          y: 200,
          width: 100,
          height: 100,
          rotation: 0
        }
      },
    },
    {
      id: uuid.v1(),
      type: layerTypes.image,
      title: 'image 1',
      order: 1,
      adjustments: {
        image: {
          src: 'http://www.placehold.it/400x400/'
        },
        dimensions: {
          x: 300,
          y: 100,
          width: 100,
          height: 100,
          rotation: 0
        }
      }
    },
    {
      id: uuid.v1(),
      type: layerTypes.text,
      title: 'text 1',
      text: 'Lorem ipsum dolor sit amet',
      order: 2,
      adjustments: {
        type: {
          color: '#444444'
        },
        dimensions: {
          x: 350,
          y: 300,
          width: 200,
          height: 100,
          rotation: 0
        }
      }
    },
    {
      id: uuid.v1(),
      type: layerTypes.rectangle,
      title: 'box 2',
      order: 3,
      adjustments: {
        fill: {
          backgroundColor: 'rgba(255,0,255,.5)'
        },
        dimensions: {
          x: 300,
          y: 250,
          width: 100,
          height: 100,
          rotation: 0
        }
      },
    },
    {
      id: uuid.v1(),
      type: layerTypes.image,
      title: 'image 2',
      order: 4,
      adjustments: {
        image: {
          src: 'http://www.placehold.it/400x400/'
        },
        dimensions: {
          x: 50,
          y: 50,
          width: 100,
          height: 100,
          rotation: 0
        }
      }
    },
    {
      id: uuid.v1(),
      type: layerTypes.ellipse,
      title: 'ellipse',
      order: 5,
      adjustments: {
        fill: {
          backgroundColor: 'rgba(0,255,255,.5)'
        },
        dimensions: {
          x: 500,
          y: 450,
          width: 100,
          height: 100,
          rotation: 0
        }
      },
    }
  ],
  selections: [],
  activeFlyout: null
}
