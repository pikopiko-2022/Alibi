import React from 'react'
import { Slideshow, SlideshowItem } from './Slideshow'

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
            Is the End
          </div>
        </SlideshowItem>
      </Slideshow>
    </div>
  )
}

export default TheEnd
