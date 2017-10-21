import React from 'react'

import ArtboardContainer from '../containers/ArtboardContainer'

import './styles/artboards.css'
import './styles/editor.css'

class HomeView extends React.Component {
  render() {
    return (
      <div className={'home-view__wrapper'}>
        <div className='home-view__featured-case-study'>
          <ArtboardContainer caseStudyId={'test'}/>
        </div>
        <div className='home-view__case-study'>
          <ArtboardContainer caseStudyId={'test'}/>
        </div>
        <div className='home-view__case-study'>
          <ArtboardContainer caseStudyId={'test'}/>
        </div>
        <div className='home-view__case-study'>
          <ArtboardContainer caseStudyId={'test'}/>
        </div>
      </div>
    )
  }
}

export default HomeView