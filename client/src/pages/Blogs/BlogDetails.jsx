import React, { createContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { getData } from "../../apis/fetching";
import CommentBox from "./CommentBox";
import CommentForm from "./CommentForm";

export default function BlogDetails() {
  const { user: authUser } = createContext(AuthContext);
  const [isUpdated,setIsUpdated] = useState()
  const [total, setTotal] = useState(0);
  const [comments, setComments] = useState([]);
  const {
    data: {
      title,
      description,
      content,
      thumbnail,
      _id,
      user: { name, profilePicture },
    },
  } = useLoaderData();

  useEffect(() => {
    const fetchingData = async () => {
      try {
    
        const data = await getData(`comment?postId=${_id}`);
        setComments(data?.data);
        setTotal(data.total);
       
      } catch (error) {
        setLoading(false);
        console.error(error.message);
      }
    };
    fetchingData();
  }, [_id,isUpdated]);

  return (
    <div>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue ">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm   ">
                  <img
                    className="mr-4 w-16 h-16 rounded-full"
                    src={profilePicture}
                    alt="Jese Leos"
                  />
                  <div>
                    <a href="#" rel="author" className="text-xl font-bold   ">
                      {name}
                    </a>
                    <p className="text-base text-gray-700 ">
                      Graphic Designer, educator &amp; CEO Flowbite
                    </p>
                    <p className="text-base text-gray-700 ">
                      <time
                        pubdate
                        dateTime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        Feb. 8, 2022
                      </time>
                    </p>
                  </div>
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight   lg:mb-6 lg:text-4xl ">
                {title}
              </h1>
            </header>
            <p className="lead">{description}</p>
            <figure>
              <img src={thumbnail} alt />
            </figure>
            <div
              className="my-5"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>

            <section className="not-format">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold   ">
                  Discussion ({total})
                </h2>
              </div>
              <CommentForm user={authUser} setIsUpdated={setIsUpdated}  postId={_id}/>

              {
                comments.map((comment)=>(
<CommentBox key={comment?._id} comment={comment} />

                ))
              }

              
            </section>
          </article>
        </div>
      </main>
    </div>
  );
}
