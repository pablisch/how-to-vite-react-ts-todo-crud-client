import { useBaseUrl } from '../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../hooks/useEndpoint.tsx'
import { useEffect } from 'react'
import { UnknownObject } from '../types/types.ts'
import { useIdParams } from '../hooks/useIdParams.tsx'
import { useItems } from '../hooks/useItems.tsx'

const SingleItem = () => {
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { idParams } = useIdParams()
  const { singleItem, getSingleItem, getSingleItemError } = useItems()

  useEffect(() => {
    console.log('something changed')
    getSingleItem()
  }, [baseUrl, endpoint, idParams])

  return (
    <div id="single-item-container">
      {getSingleItemError ? (
        <p>{getSingleItemError}</p>
      ) : !idParams ? (
        <p>Set URL /:id parameter to get an item by ID</p>
      ) : singleItem && !Array.isArray(singleItem) ? (
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            background: '#f4f4f4',
            padding: '10px',
            borderRadius: '5px',
            overflowX: 'auto',
          }}
        >
          <code>{formatObjectAsJSObject(singleItem)}</code>
        </pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )

  // Function to format object as JS object (without quotes around keys)
  function formatObjectAsJSObject(obj: UnknownObject) {
    if (typeof obj !== 'object' || obj === null) {
      return String(obj) // Return the value itself if it's not an object
    }

    // Recursively format objects and arrays with proper indentation
    const formattedObject = JSON.stringify(obj, null, 5) // 2 spaces indentation
      .replace(/"([^(")"]+)":/g, '$1:') // Remove quotes around keys

    return formattedObject
  }

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
