
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify"
import { imageDB } from "../firebase/firebase.config";

export const  profileUpload = async(file,userId)=>{
try {
    const profileRef = ref(imageDB,`files/${userId}`)
   await uploadBytes(profileRef,file)
    const downloadURL = await getDownloadURL(profileRef);
    toast('image Uploaded Successfully')
    return  downloadURL
    
} catch (error) {
    toast.error(error.message);
}
}
export const  blogUpload = async(file,userId)=>{
    try {
        const fileName = `${userId}-${Date.now()}`;
        const profileRef = ref(imageDB,`blogs/${fileName}`)
       await uploadBytes(profileRef,file)
        const downloadURL = await getDownloadURL(profileRef);
        toast('image Uploaded Successfully')
        return  downloadURL
        
    } catch (error) {
        toast.error(error.message);
    }
    }