import List from '../components/List.tsx'
import SingleItem from '../components/SingleItem.tsx'
import PatchUpdateItemForm from '../components/PatchUpdateItemForm.tsx'
import { useItems } from '../hooks/useItems.tsx'
import OperationIndicator from '../components/OperationIndicator.tsx'

const MainPage = () => {
  const { operation } = useItems()

  return (
    <div className="main-page-container">
      <List />
      <div id="operation-panel">
        <OperationIndicator />
        {operation === 'getById' ? (
          <SingleItem />
        ) : operation === 'patchUpdate' ? (
          <PatchUpdateItemForm />
        ) : (
          <SingleItem />
        )}
      </div>
    </div>
  )
}

export default MainPage
