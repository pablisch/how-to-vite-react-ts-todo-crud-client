import List from '../features/allItemsPane/List.tsx'
import SingleItem from '../features/singleItemPane/SingleItem.tsx'
import UpdateItemForm from '../features/singleItemPane/UpdateItemForm.tsx'
import { useItems } from '../hooks/useItems.tsx'
import OperationIndicator from '../features/singleItemPane/OperationIndicator.tsx'

const MainPage = () => {
  const { operation } = useItems()

  return (
    <div className="main-section-container">
      <List />
      <div id="operation-panel-container" className={`main-section-panes`}>
        <OperationIndicator />
        {operation === 'getById' ? (
          <SingleItem />
        ) : operation === 'update' ? (
          <UpdateItemForm />
        ) : (
          <SingleItem />
        )}
      </div>
    </div>
  )
}

export default MainPage
