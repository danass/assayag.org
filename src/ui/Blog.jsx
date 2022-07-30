
import React, { useState, useEffect, useContext } from "react"
import { UserContext } from './userContext';
import { useParams } from "react-router-dom";


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

        <button onClick={() => { // Meteor.call() 
        let slugname = document.getElementById('collection-name').value.replace(/\s/g, '-') 
        let images = [...importedFiles].map(async (file, i) => {
          var reader = new FileReader();

          fetch(URL.createObjectURL(file)).then(res => res.blob()).then(blob => {
            reader.readAsDataURL(blob);
             reader.onload = async () => {
              let data = reader.result;
              let image = {
                name: file.name,
                data: data,
                type: file.type,
                size: file.size,
                url: URL.createObjectURL(file)
              }
              setImages(images => [...images, image])
              return image
            }
          }
          )

        })
        console.log(iimages)
        Meteor.call('blog.save', slugname, iimages, (err, res) => {
          if (err) { 
            console.log(err) 
            return err }
          console.log("done", res)
        })
          console.log(slugname) } }> Add Collection </button>

      <form> <input type="file" multiple onChange={(e) => { setImportedFiles(e.target.files) } } />
       {importedFiles && importedFiles.length > 0 && ( <ul> {[...importedFiles].map((file, i) => ( <li key={i}> {file.name} <img src={URL.createObjectURL(file)} alt={file.name} /> </li> ))} </ul> )}

      </form>
      </>
      : <>
      {importedFiles?.images?.map(o => {
        return <img src={o.data} alt={o.name} />

      })}
      </>
       }


    </main>
  )

}