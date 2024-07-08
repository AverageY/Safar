import React from "react";
import Image_Picker_image from '../../assets/images.jpeg'
import { useState, useRef } from "react";
import './Image_Picker.css'



const Image_Picker = ()=>{
    
    const inputRef =  useRef("");
    const [image, setImage] = useState("");
    

    const handleImageClick = ()=>{
        inputRef.current.click();
    }

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        const imgname = e.target.files[0].name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const maxSize = Math.max(img.width, img.height);
                canvas.width = maxSize;
                canvas.height = maxSize;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(
                    img,
                    (maxSize - img.width)/2,
                    (maxSize - img.height)/2
                );
                canvas.toBlob(
                    (blob) =>{
                        const file = new File([blob], imgname, {
                            type: "image/png",
                            lastModified: Date.now(),
                        });

                        console.log(file);
                        setImage(file)
                    },
                    "image/jpeg",
                    0.8
                );
            };
        };


    };
    
    return (
        <div onClick={handleImageClick}> 
        {
           image ? <img className='img-display-after' src ={URL.createObjectURL(image)}/> : <img src={Image_Picker_image} className="img-display-before" alt="" />
        }
          <input type = 'file' ref={inputRef} onChange={handleImageChange} style= {{display: "none"}}></input>
        </div>
    )
}

export default Image_Picker
