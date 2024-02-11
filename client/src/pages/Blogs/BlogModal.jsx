import React, { useContext, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import JoditEditor from "jodit-react";
import { FaTimes } from 'react-icons/fa'; // Import the Font Awesome times icon
import { updateData } from "../../apis/fetching";
import { toast } from "react-toastify";

function BlogModal({showModal,setShowModal,data}) {
    console.log(showModal);
   
    const [thumbnail, setThumbnail] = useState(null);
    const { user } = useContext(AuthContext);
    const { handleSubmit, control, register } = useForm();
    const editor = useRef(null);
    const [content, setContent] = useState("");

    const onSubmit = async (dat) => {
try {
    const originalData = {
        ...dat,
        user: user?._id,
        content: content
    };
   await updateData(`blog/${data?._id}`,originalData)
    toast.success('Updated Successfully');
    setShowModal(false)
} catch (error) {
    toast.error(error.message)
}
    };


    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
          <div >
            {showModal && (
                <div className="absolute inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div> {/* Backdrop */}
                    <div className="relative z-10 w-full md:w-[90%] mx-auto bg-white rounded shadow-lg overflow-y-auto h-screen max-h-[460px]"> {/* Modal content wrapper */}
                        <div className="p-6">
                            <div className="flex justify-between items-center pb-3">
                                <h3 className="text-2xl font-semibold">New Blog Post</h3>
                                <button onClick={closeModal} className="focus:outline-none">
                                    <FaTimes /> {/* Close Icon */}
                                </button>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">

                                    <label className="text-xl text-gray-600">Title <span className="text-red-500">*</span></label><br /> <br />
                                    <Controller
                                        name="title"
                                        control={control}
                                        defaultValue={data?.title}
                                        rules={{ required: true }}
                                        render={({ field }) => <input {...field} className="border-2 border-gray-300 p-2 w-full" />}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="text-xl text-gray-600">Description</label><br />
                                    <Controller
                                        name="description"
                                        control={control}
                                        defaultValue={data?.description}
                                        render={({ field }) => <input {...field} className="border-2 border-gray-300 p-2 w-full" />}
                                    />
                                </div>
                                <label className="text-xl text-gray-600">Write Your Blog Here <span className="text-red-500">*</span></label><br /> <br />

                                <JoditEditor
                                    ref={editor}
                                    value={data?.content}
                                    defaultValue={data?.content}
                                    onChange={(newContent) => setContent(newContent)}
                                />

                                <div className="flex p-1">
                                    <button type="submit" className="p-3 bg-blue-500 text-white hover:bg-blue-400" required>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
      
    );
}

export default BlogModal;
