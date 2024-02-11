import React, { useContext, useEffect, useState } from "react";
import { getData, updateData } from "../../apis/fetching";
import { toast } from "react-toastify";

export default function ManageUser() {
  const [status, setStatus] = useState("");
  const [random, setRandom] = useState();


  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchingData = async () => {
      let url = `users`
      if(!status){
        url = `users`
      }
      if(status && status!=='disabled'){
        url =`users?role=${status}`
      }
      if(status && status ==='disabled'){
        url =`users?userStatus=false`
      }
      try {
        const data = await getData(url);
        setUsers(data?.data);
      } catch (error) {
        toast.error(error?.message);
      }
    };
    fetchingData();
  }, [random,status]);

  const handleStatus = (id, status) => {

    try {
      const fetchingData = async () => {
        try {
          const data = await updateData(`users/${id}`,{userStatus:status});
         setRandom(Math.random())
        } catch (error) {
          toast.error(error?.message);
        }
      };
      fetchingData();
    } catch (error) {
      console.log(error.message);
    }


  };

  return (
    <div className="pt-[80px]">
      <div className="container mx-auto">
        <div className=" bg-gray-50 ">
          <div className="px-4 mx-auto max-w-screen-xl">
            <h2 className="mb-8 text-2xl font-bold text-center text-gray-900 ">
              All Users
            </h2>
            <div className="my-5 text-center">
              <div
                class="inline-flex rounded-md shadow-sm text-center"
                role="group"
              >
                <button
                  onClick={() => setStatus("")}
                  type="button"
                  class={`px-4 py-2 text-sm font-medium text-white ${
                    !status ? " bg-primary" : "bg-purple-300"
                  } border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 `}
                >
                  All Users
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("recruiter")}
                  class={`px-4 py-2 text-sm font-medium text-white ${
                    status === "recruiter" ? " bg-primary" : "bg-purple-300"
                  } border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700`}
                >
                  Recruiter
                </button>
                <button
                  onClick={() => setStatus("candidate")}
                  type="button"
                  class={`px-4 py-2 text-sm font-medium text-white ${
                    status === "candidate" ? " bg-primary" : "bg-purple-300"
                  }  border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700`}
                >
                  Candidate
                </button>
                <button
                  onClick={() => setStatus("disabled")}
                  type="button"
                  class={`px-4 py-2 text-sm font-medium text-white ${
                    status === "disabled" ? " bg-primary" : "bg-purple-300"
                  } border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700`}
                >
                  Blocked User
                </button>
              </div>

              {/* userTable */}
              <div className="container p-2 my-7 mx-auto rounded-md sm:p-4 dark:text-gray-100 dark:bg-gray-900">
                <h2 className="mb-3 text-2xl font-semibold leadi"></h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs">
                    <thead className="rounded-t-lg dark:bg-gray-700">
                      <tr className="text-right">
                        <th title="Ranking" className="p-3 text-left">
                          #
                        </th>
                        <th title="Team name" className="p-3 text-left">
                          Name
                        </th>
                        <th title="Wins" className="p-3">
                          Email
                        </th>
                        <th title="Losses" className="p-3">
                          Role
                        </th>
                        <th title="Win percentage" className="p-3">
                          Status
                        </th>
                        <th title="Win percentage" className="p-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                     {
                       users?.map(({email,name,role, userStatus,id},i) => (
                        <tr key={i} className="text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                        <td className="px-3 py-2 text-left">
                          <span>{i}</span>
                        </td>
                        <td className="px-3 py-2 text-left">
                          <span>{name}</span>
                        </td>
                        <td className="px-3 py-2">
                          <span>{email}</span>
                        </td>
                        <td className="px-3 py-2">
                          <span>{role}</span>
                        </td>
                        <td className="px-3 py-2">
                          <span>{userStatus ? 'active' : 'disabled'}</span>
                        </td>
                        <td className="px-3 py-2">
                          {
                            userStatus ? (<button className="btn bg-white "
                            onClick={()=>handleStatus(id,'false')}
                            >Disable User</button>) : (<button className="btn bg-white"onClick={()=>handleStatus(id,'true')}>Enable User</button>)
                          }
                        </td>
                      </tr>
                      ))
                     }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
