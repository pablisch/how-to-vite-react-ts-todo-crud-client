import { useEffect } from 'react'
import { useBaseUrl } from '../../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../../hooks/useEndpoint.tsx'
import ListItem from './ListItem.tsx'
import { useItems } from '../../hooks/useItems.tsx'
import helpers from '../../utils/helpers.tsx'
import Loading from '../../components/Loading.tsx'

function List() {
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { items, getAllItems, getAllItemsError } = useItems()

  useEffect(() => {
    getAllItems()
  }, [baseUrl, endpoint])

  return (
    <div id="list-container" className="main-section-panes">
      {getAllItemsError ? (
        <>
          {getAllItemsError?.props?.children[0]?.props?.children === 0 && (
            <>
              <div>
                Since no response status was returned from the API request, it
                is recommended to inspect the Network and Console in dev tools
                to find more information.
              </div>
              <br />
              <div>
                <strong>Example:</strong> A Network Status 'CORS error' tells
                you that the API you are trying to connect with has a CORS
                policy that is blocking the connection.
              </div>
            </>
          )}
          <div className={`list-errors`}>{getAllItemsError}</div>
        </>
      ) : Array.isArray(items) && items.length > 0 ? (
        <div>
          {items.map((item, index) => (
            <ListItem item={item} key={item?._id || item?.id || index} />
          ))}
        </div>
      ) : Array.isArray(items) && items.length === 0 ? (
        <div className="flex-container">
          {`There are no ${endpoint.replace(/^\/+/, '')} to display`}
        </div>
      ) : typeof items === 'object' && !Array.isArray(items) ? (
        <div className="flex-container">
          {items && helpers.formatObjectAsJsxWithBoldKeys(items)}
        </div>
      ) : (
        <div className="loading-container">
          <Loading />
        </div>
      )}
    </div>
  )
}

export default List
