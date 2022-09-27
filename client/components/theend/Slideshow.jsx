import React, {
  useRef,
  useContext,
  useState,
  useEffect,
  createContext,
} from 'react'
import styles from './TheEnd.module.scss'

// Sourced from
// https://dev.to/anxiny/create-a-slideshow-with-react-1pb1

const SlideshowContext = createContext()

export function Slideshow({ children }) {
  const [context, setContext] = useState({
    items: [],
    edge: false,
  })
  const timer = useRef(null)

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      if (context.items.length > 1 && context.edge) {
        const head = context.items.shift()
        context.items.push(head)
      }
      context.edge = !context.edge
      setContext({ ...context })
    }, 2500)

    return () => clearTimeout(timer.current)
  })

  return (
    <SlideshowContext.Provider value={[context, setContext]}>
      <div className={styles.slideshow}>{children}</div>
    </SlideshowContext.Provider>
  )
}

export function SlideshowItem({ name, children }) {
  // Generate a name for this slide.
  const [context] = useContext(SlideshowContext)
  const [stage, setStage] = useState('ready')

  useEffect(() => {
    // register self with the name.
    context.items.push(name)
    return () => {
      // Remove the name when slide is removed.
      const index = context.items.indexOf(name)
      context.items.splice(index, 1)
    }
  }, [])

  useEffect(() => {
    const activeName = context.items[0]
    if (activeName === name) {
      setStage('on')
    }
    if (activeName !== name && stage === 'on') {
      setStage('off')
    }
    if (activeName !== name && stage === 'off') {
      setStage('ready')
    }
  }, [context])

  let left = 0
  let zIndex = 0
  switch (stage) {
    case 'ready':
      left = '100%'
      break
    case 'on':
      left = '0'
      zIndex = 1
      break
    case 'off':
      zIndex = 0
      break
    default:
  }

  return (
    <div
      className={styles.slideshowItem}
      style={{
        left: left,
        zIndex: zIndex,
      }}
    >
      {children}
    </div>
  )
}
