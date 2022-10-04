// React 
 import React, { useState, useEffect, useContext } from "react"
 import { UserContext } from './userContext';


export const France = () => {
  
  // importing csv file
  const [importedFiles, setImportedFiles] = useState(null)
  const [csvData, setCsvData] = useState([])

  return (
    <main>
      <h1>France</h1>

      // we are importing a csv file containing data about the french population
      <form>

        <input id="csvdata" type="file" onChange={(e) => {
          setImportedFiles(e.target.files)
        }
        } />
      </form>
      // uploading the csv file to the server
      <button onClick={() => {
        let file = importedFiles[0]
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (event) {
          let csvData = event.target.result;
          setCsvData(csvData)
        }
        reader.onerror = function () {
          alert('Unable to read ' + file.fileName);
        }
      }
      }>Upload</button>
      
      // showing csv data as a table using first line as header
      <table>
        <thead>
          <tr>
            {csvData.split('\n')[0].split(',').map((header, i) => {
              return <th key={i}>{header}</th>
            }
            )}
          </tr>
        </thead>
        <tbody>
          {csvData.split('\n').map((row, i) => {
            if (i > 0) {
              return <tr key={i}>
                {row.split(',').map((cell, j) => {
                  return <td key={j}>{cell}</td>
                }
                )}
              </tr>
            }
          }
          )}
        </tbody>
      </table>
      

    </main>
  )
}

