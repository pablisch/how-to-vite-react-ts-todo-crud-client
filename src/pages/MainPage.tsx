import List from '../components/List.tsx'
import SingleItem from '../components/SingleItem.tsx'
import UpdateItemForm from '../components/UpdateItemForm.tsx'
import { useItems } from '../hooks/useItems.tsx'
import OperationIndicator from '../components/OperationIndicator.tsx'

const MainPage = () => {
  const { operation } = useItems()

  return (
    <div className="main-page-container">
      <List />
      <div id="operation-panel" className="panel-1">
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
