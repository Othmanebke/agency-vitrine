import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Portfolio from './pages/Portfolio'

export default function App(){
  const [path, setPath] = useState(window.location.pathname)

  useEffect(()=>{
    const onPop = ()=> setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return ()=> window.removeEventListener('popstate', onPop)
  }, [])

  if(path === '/pricing') return <Pricing />
  if(path === '/portfolio') return <Portfolio />
  return <Home />
}
