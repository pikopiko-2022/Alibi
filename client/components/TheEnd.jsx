import React from 'react'
import { Slideshow, SlideshowItem } from './Slideshow'
import WorstFlatmate from './theend/WorstFlatmate'
import FlatFun from './theend/FlatFun'
import MostComplaints from './theend/MostComplaints'

const TheEnd = () => {
  return (
    <div style={{ position: 'relative' }}>
      <Slideshow width={100} height={100}>
        <SlideshowItem name={1}>
          <div
            style={{
              width: '600px',
              height: '600px',
              backgroundColor: 'yellow',
            }}
          >
            <WorstFlatmate />
          </div>
        </SlideshowItem>
        <SlideshowItem name={2}>
          <div
            style={{ width: '600px', height: '600px', backgroundColor: 'blue' }}
          >
            <FlatFun />
          </div>
        </SlideshowItem>
        <SlideshowItem name={3}>
          <div
            style={{
              width: '600px',
              height: '600px',
              backgroundColor: 'green',
            }}
          >
            <MostComplaints />
          </div>
        </SlideshowItem>
      </Slideshow>
    </div>
  )
}

export default TheEnd
