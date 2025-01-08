import List from '../features/allItemsPane/List.tsx'
import GetByIdResponse from '../features/singleItemPane/GetByIdResponse.tsx'
import UpdateItemForm from '../features/singleItemPane/UpdateItemForm.tsx'
import { useItems } from '../hooks/useItems.tsx'
import OperationIndicatorPanel from '../features/singleItemPane/OperationIndicatorPanel.tsx'
import DeleteResponse from '../features/singleItemPane/DeleteResponse.tsx'

const MainPage = () => {
  const { operation } = useItems()

  return (
    <div className="main-section-container">
      <List />
      <div id="operation-panel-container" className={`main-section-panes`}>
        <OperationIndicatorPanel />
        {operation === 'getById' ? (
          <GetByIdResponse />
        ) : operation === 'update' ? (
          <UpdateItemForm />
        ) : operation === 'delete' ? (
          <DeleteResponse />
        ) : (
          <GetByIdResponse />
        )}
      </div>
    </div>
  )
}

export default MainPage
