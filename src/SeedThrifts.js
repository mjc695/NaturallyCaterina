import React, {useEffect, useState} from 'react'
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'
import './SeedThrifts.css'

const ThriftingPage = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imgArr, setImgArr] = useState([])
    const [imageAsFile, setImageAsFile] = useState('')


    const onNameChange = (e) =>{
        e.persist()
        setName(e.target.value)
        console.log('name changing', name)
    }

    const onDescriptionChange = (e) =>{
        e.persist()
        setDescription(e.target.value)
    }
    
    const onFileUpload = (e)=>{
        // e.persist()
        console.log(e.target.files[0])
        if (e.target.files[0]){
           setImageAsFile(e.target.files[0])
           setImgArr([...imgArr, e.target.files[0]])
        }
    }

    const removeFile = (e,idx) =>{
        console.log(idx)
        let newArr = []
        for(let i=0; i<imgArr.length; i++){
            if (i!==idx){
                newArr.push(imgArr[i])
            }
        }
        setImgArr(newArr)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (imgArr.length<1) return alert("Please attach image")
        if (name.length<1) return alert('Please input a valid name')
        if (description.length<1) return alert('Please input a valid description')

        console.log('submitting:', imgArr)

        imgArr.map((file, key) =>{
            console.log(key, ':', file)
        })

        console.log('finished submitting')
    }

    // const [imgUrls,setImgUrls] = useState([])
    // useEffect(()=>{
    //     console.log('grabbing thrifting item data')
    //     const storage = getStorage()
    //     const listRef = ref(storage, '/selling-images')
    //     let urlsArray = []

    //     const downloadUrl = async(imgRef) => await getDownloadURL(ref(storage,imgRef))
    //     .then((url)=>{
    //         console.log('download url', url)
    //         urlsArray.push(url)
    //         console.log('urls array', urlsArray)
    //         console.log('state urls array', imgUrls)
    //     }).catch((error=>console.log(error)))


    //     const getItems = async () =>{
    //         await listAll(listRef).then((res)=>{
    //             res.items.forEach(async (itemRef)=>{
    //                 await downloadUrl(itemRef._location.path_)

    //             })
    //             // commented code for accessing multiple folders
    //             // console.log('response original', res)
    //             // res.prefixes.forEach((folderRef)=>{
    //                 // console.log('folder ref', folderRef)
    //             // })
    //         }).catch((error)=>console.log(error))
    //     }
    //     getItems()
    //     setTimeout(()=>setImgUrls([...urlsArray]), 1500)
    // }, [])

    // useEffect(()=>{
    //     if(imgUrls.length<1) setImgUrls()
    // })

    console.log('image array:', imgArr)
    return(
        <div>
            <div className='data-form'>
                <form onSubmit={handleSubmit}  >
                    <input type='text' id='name' name='name'  onChange={onNameChange} />
                    {/* {name} */}
                    <input type='text' id='description' name='description'  onChange={onDescriptionChange} />
                    {/* {description} */}
                    <label>
                        <input className='file-input' type='file' onChange={onFileUpload} accept='.jpg, .jpeg, .png' multiple />
                        {imgArr.map((file,key)=>{
                            return (
                                <div key={key}>
                                    <div>{file.name}</div>
                                    <img className='upload-preview' src={URL.createObjectURL(file)} alt='/caterina-C.jpg'></img>
                                    <div onClick={(e)=>removeFile(e,key)}>x</div>
                                </div>
                            )
                        })}
                        Custom Upload
                    </label>
                    <button type='submit'>submit</button>
                </form>
            </div>
            {/* <img className='thrifting-image' src={imgUrls[0]} alt='gs://naturallycaterina.appspot.com/selling-images/IMG_20210731_152804.jpg'></img> */}
        </div>
    )
}

export default ThriftingPage