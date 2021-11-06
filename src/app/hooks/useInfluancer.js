import { useContext } from 'react'
import InfluancerContext from 'app/contexts/InfluancerContext'

const useInfluancer = () => useContext(InfluancerContext)

export default useInfluancer
