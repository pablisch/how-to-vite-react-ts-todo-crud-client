import helpers from '../utils/helpers.tsx'
import { UnknownObject } from '../types/types.ts'
import '../App.css'

interface ObjectDisplayProps {
  object: UnknownObject
  heightClassPrefix: string
}

const ObjectDisplay = ({ object, heightClassPrefix }: ObjectDisplayProps) => {
  return (
    <div
      className={`response-object-container ${heightClassPrefix}-display-height`}
    >
      <div className="response-object-panel">
        {helpers.formatObjectAsJsxWithBoldKeys(object)}
      </div>
    </div>
  )
}

export default ObjectDisplay
