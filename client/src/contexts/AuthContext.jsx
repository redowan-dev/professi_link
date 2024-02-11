import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getData, updateData } from "../apis/fetching";

const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);

// create a context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    email: "",
    role: "",
    id: "",
    token: "",
    isVerified: false,
    _id:'',
    userStatus:false
  });

  

  const pathname = window.location.pathname;

  // if (loading) {
  //   return <Loading />;
  // }

  const createUserWithEmail = ({ email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginWithEmail = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const verifyEmailWithLink = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const resetPass = (email) => {
    if (!email) {
      toast.error("Please Provide A valid Email");
    }

    return sendPasswordResetEmail(auth, email);
  };


  // signin withpopup

  const socialSignin = () => {
    console.log('cliecked');
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
    
  };

  // logout

  const logout = () => {
    const logout = signOut(auth);
    localStorage.setItem("access_token", null);
    return 
  };

  // state ovserver

  // state observer
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {

      setUser(currentUser);
      const token = currentUser?.accessToken;
      localStorage.setItem("access_token", JSON.stringify(token));

      const fetchingData = async () => {
        try {
          let data;
          data = await getData(`users/${currentUser?.uid}`);

if(data?.data?.userStatus){
  setUser({
    role: data?.data?.role,
    email: data?.data?.email,
    token: data?.data?.accessToken,
    id: data?.data?.id,
    isVerified: data?.data?.isVerified,
    _id:data?.data?._id,
    userStatus:data?.data?.userStatus
  });
}else{
  throw new Error('You Are Resticted By Admin')
}
if (user && currentUser?.emailVerified && !user?.isVerified) {
  // If the user's email has been verified, update the user data
  const updated = await updateData(`users/${currentUser.uid}`, {
    isVerified: "true",
  });
}

         

          if (!data?.data?.role && !pathname === "register") {
            window.location.href = "/register";
            console.log("no rules found");
          }
          setLoading(false);
        } catch (error) {
          toast.error(error.message);
          setLoading(false);
        }
      };
      if (currentUser?.uid) {
        fetchingData();
      }
      
    
    });
 

    return () => {
      unsubscribe();
    };
  }, []);



  const authInfo = {
    createUserWithEmail,
    loginWithEmail,
    loading,
    user,
    setUser,
    verifyEmailWithLink,
    logout,
    updateUserProfile,
    socialSignin,
    setLoading,
    resetPass,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
