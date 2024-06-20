
import React, { useState, useEffect, useContext } from "react"
import { UserContext } from './userContext';
import { useParams } from "react-router-dom";
// import loading 
import { Loading } from './Animations';


export const Blog = () => {
  const [importedFiles, setImportedFiles] = useState(null)
  const { id } = useParams();
  const [iimages, setImages] = useState([])

  useEffect(() => {
    if (id) {
      Meteor.call('blog.get', id, (err, res) => {
        if (err) { 
          console.log(err)
          return err }
        setImportedFiles(res)

        })
        }
        }, [id])
        


  return (
    <main>
    
       <h1>{id}</h1>
       { id == undefined?
        <>
      <form><input id="collection-name" type="text" name="name" /> </form>

        <button onClick={() => {
        let slugname = document.getElementById('collection-name').value.replace(/\s/g, '-') 
        let images = [...importedFiles].map((file, i) => {
          var reader = new FileReader();

          fetch(URL.createObjectURL(file)).then(res => res.blob()).then(blob => {
            reader.readAsDataURL(blob);
             reader.onload =  () => {
              let data =  reader.result;
              let image = {
                data: data,
                name: file.name,
                type: file.type,
                size: file.size
              }

              Meteor.call('blog.save', slugname, image, (err, res) => {
                if (err) {
                  console.log(err) 
                  return err }
                console.log("done")
              })
            }
          })

        })
         } }>Add Collection</button>

      <form><input type="file" multiple onChange={(e) => { setImportedFiles(e.target.files) } } />
       {importedFiles && importedFiles.length > 0 && ( <ul> {[...importedFiles].map((file, i) => ( <li key={i}> {file.name} <img src={URL.createObjectURL(file)} alt={file.name} /> </li> ))} </ul> )}
      </form>
      </>
      : <>
      {importedFiles?.length > 0 ? 
      importedFiles?.sort((a,b) => {
        //sort by name ascending (string comparison)
         return a.image.name.localeCompare(b.image.name)
        }).map(o => {
        return <><img src={o.image.data}  />{o.image.name}</>
      })
      : <Loading />}
      </>
       }
    </main>
  )

}