import { useBaseUrl } from '../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../hooks/useEndpoint.tsx'
import { useEffect } from 'react'
import { UnknownObject } from '../types/types.ts'
import { useIdParams } from '../hooks/useIdParams.tsx'
import { useItems } from '../hooks/useItems.tsx'
import '../css/SingleItem.css'
import '../App.css'

const SingleItem = () => {
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { idParams } = useIdParams()
  const { singleItem, getSingleItem, getSingleItemError, operation } =
    useItems()

  useEffect(() => {
    console.log('something changed. Operation:', operation)
    if (operation === 'getById') getSingleItem()
  }, [baseUrl, endpoint, idParams])

  return (
    <div id="single-item-container">
      {getSingleItemError ? (
        <pre className="error-message">{getSingleItemError}</pre>
      ) : !idParams ? (
        <p>Set URL /:id parameter to get an item by ID</p>
      ) : singleItem && !Array.isArray(singleItem) ? (
        <div className="single-item-display">
          {formatObjectAsJSX(singleItem)}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )

  // Function to format object as JSX with bold keys
  function formatObjectAsJSX(obj: UnknownObject): React.ReactNode {
    if (typeof obj !== 'object' || obj === null) {
      return <span>{String(obj)}</span> // Return the value itself if it's not an object
    }

    return (
      <ul className="single-item-details">
        {Object.entries(obj).map(([key, value]) => (
          <li key={key}>
            <strong>{key}</strong>:{' '}
            {typeof value === 'object' && value !== null ? (
              formatObjectAsJSX(value) // Recursively render nested objects
            ) : (
              <span>{String(value)}</span>
            )}
          </li>
        ))}
      </ul>
    )
  }

  // return (
  //   <div id="single-item-container">
  //     {getSingleItemError ? (
  //       <pre className="error-message">{getSingleItemError}</pre>
  //     ) : !idParams ? (
  //       <p>Set URL /:id parameter to get an item by ID</p>
  //     ) : singleItem && !Array.isArray(singleItem) ? (
  //       <pre className="single-item-display">
  //         <code>{formatObjectAsJSObject(singleItem)}</code>
  //       </pre>
  //     ) : (
  //       <p>Loading...</p>
  //     )}
  //   </div>
  // )
  //
  // // Function to format object as JS object (without quotes around keys)
  // function formatObjectAsJSObject(obj: UnknownObject) {
  //   if (typeof obj !== 'object' || obj === null) {
  //     return String(obj) // Return the value itself if it's not an object
  //   }
  //
  //   // Recursively format objects and arrays with proper indentation
  //   const formattedObject = JSON.stringify(obj, null, 5)
  //     .replace(/"([^(")"]+)":/g, '$1:') // Remove quotes around keys
  //
  //   return formattedObject
  // }

  // return (
  //   <div id="single-item-container">
  //     {itemError ? (
  //       <p>{itemError}</p>
  //     ) : !idParams ? (
  //       <p>Set URL /:id parameter to get an item by ID</p>
  //     ) : item && !Array.isArray(item) ? (
  //       Object.entries(item).map(([key, value]) => (
  //         <p key={key}>
  //           <strong>{key}:</strong> {String(value)}
  //         </p>
  //       ))
  //     ) : (
  //       <p>Loading...</p>
  //     )}
  //   </div>
  // )

  // const renderValue = (value, indentLevel = 0) => {
  //   const indentStyle = { paddingLeft: `${indentLevel * 20}px` };
  //
  //   if (Array.isArray(value)) {
  //     // Render arrays
  //     return (
  //       <ul style={indentStyle}>
  //         {value.map((item, index) => (
  //           <li key={index}>{renderValue(item, indentLevel + 1)}</li>
  //         ))}
  //       </ul>
  //     );
  //   } else if (typeof value === 'object' && value !== null) {
  //     // Render objects
  //     return (
  //       <div style={indentStyle}>
  //         {Object.entries(value).map(([nestedKey, nestedValue]) => (
  //           <div key={nestedKey}>
  //             <strong>{nestedKey}:</strong> {renderValue(nestedValue, indentLevel + 1)}
  //           </div>
  //         ))}
  //       </div>
  //     );
  //   } else {
  //     // Render primitive values
  //     return <span style={indentStyle}>{String(value)}</span>;
  //   }
  // };
  //
  // return (
  //   <div id="single-item-container">
  //     {itemError ? (
  //       <p>{itemError}</p>
  //     ) : !idParams ? (
  //       <p>Set URL /:id parameter to get an item by ID</p>
  //     ) : item && !Array.isArray(item) ? (
  //       Object.entries(item).map(([key, value]) => (
  //         <div key={key} style={{ marginBottom: '10px' }}>
  //           <strong>{key}:</strong> {renderValue(value)}
  //         </div>
  //       ))
  //     ) : (
  //       <p>Loading...</p>
  //     )}
  //   </div>
  // );

  // return (
  //   <div id="single-item-container">
  //     {itemError ? (
  //       <p>{itemError}</p>
  //     ) : !idParams ? (
  //       <p>Set URL /:id parameter to get an item by ID</p>
  //     ) : item ? (
  //       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', background: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
  //       {JSON.stringify(item, null, 2)}
  //     </pre>
  //     ) : (
  //       <p>Loading...</p>
  //     )}
  //   </div>
  // );

  // return (
  //   <div id="single-item-container">
  //     {itemError ? (
  //       <p>{itemError}</p>
  //     ) : !idParams ? (
  //       <p>Set URL /:id parameter to get an item by ID</p>
  //     ) : item ? (
  //       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', background: '#f4f4f4', padding: '10px', borderRadius: '5px', overflowX: 'auto' }}>
  //       <code>{JSON.stringify(item, null, 6)}</code>
  //     </pre>
  //     ) : (
  //       <p>Loading...</p>
  //     )}
  //   </div>
  // );
}

export default SingleItem
