import React, { useContext, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import JoditEditor from "jodit-react";
import { AuthContext } from '../../contexts/AuthContext';
import { blogUpload, profileUpload } from '../../utils/uploadFiles';
import { postData } from '../../apis/fetching';
import { toast } from 'react-toastify';

const AddBlog = () => {
    const [thumbnail,setThumbnail]= useState(null)
    const {user} = useContext(AuthContext)
 const { handleSubmit, control,register } = useForm();
 const editor = useRef(null);
 const [content, setContent] = useState("");
 const onSubmit = async(data) => {
   const originalData = {
    ...data,
    thumbnail,
    user:user?._id,
    content: content
   }
  await postData(`blog`,originalData)
  toast.success('Blog Added Successfully')

    // Handle form submission here
 };
 const handleFileChange = async(event) => {
    const file = event.target.files[0];
    if (file) {
      
            const data =  await blogUpload(file,user?.id)
            setThumbnail(data)
            }
     else {
      console.log('No file selected');
    }
  };

 return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="text-xl text-gray-600">Thumbnail <span className="text-red-500">*</span></label><br />
                <input type="file" name='thumbnail' onChange={(e)=>handleFileChange(e)} /> <br /> <br />
                <label className="text-xl text-gray-600">Title <span className="text-red-500">*</span></label><br /> <br />
                <Controller
                 name="title"
                 control={control}
                 defaultValue=""
                 rules={{ required: true }}
                 render={({ field }) => <input {...field} className="border-2 border-gray-300 p-2 w-full" />}
                />
              </div>

              <div className="mb-4">
                <label className="text-xl text-gray-600">Description</label><br />
                <Controller
                 name="description"
                 control={control}
                 defaultValue=""
                 render={({ field }) => <input {...field} className="border-2 border-gray-300 p-2 w-full" />}
                />
              </div>
              <label className="text-xl text-gray-600">Write Your Blog Here <span className="text-red-500">*</span></label><br /> <br />

              <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />


              <div className="flex p-1">

                <button type="submit" className="p-3 bg-blue-500 text-white hover:bg-blue-400" required>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
 );
};

export default AddBlog;
