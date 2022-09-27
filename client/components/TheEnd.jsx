import React from 'react'
import { Slideshow, SlideshowItem } from './Slideshow'
import MostAlibis from '../components/theend/MostAlibis'

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
            Hello
          </div>
        </SlideshowItem>
        <SlideshowItem name={2}>
          <div
            style={{ width: '600px', height: '600px', backgroundColor: 'blue' }}
          >
            This
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
            <MostAlibis />
          </div>
        </SlideshowItem>
      </Slideshow>
    </div>
  )
}

export default TheEnd
