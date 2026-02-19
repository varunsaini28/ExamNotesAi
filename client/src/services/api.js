// import axios from "axios"
// import { serverUrl } from "../App"
// import { setUserData } from "../redux/userSlice"

// export const getCurrentUser = async (dispatch) => {
//     try {
//         const result = await axios.get(serverUrl + "/api/user/currentuser" , {withCredentials:true})
        
//         dispatch(setUserData(result.data))
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const generateNotes = async (payload) => {
//     try {
//         const result = await axios.post(serverUrl+ "/api/notes/generate-notes" , payload , {withCredentials:true})
//         console.log(result.data)
//         return result.data

//     } catch (error) {
//         console.log(error)
//     }
// }

// export const downloadPdf = async (result) => {
//     try {
//         const response = await axios.post(serverUrl+ "/api/pdf/generate-pdf" , {result} , {
//             responseType:"blob" , withCredentials:true
//         })

//         const blob = new Blob([response.data], {
//       type: "application/pdf"
//     });

//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "ExamNotesAI.pdf";
//     link.click();

//     window.URL.revokeObjectURL(url);
//     } catch (error) {
//          throw new Error("PDF download failed");

//     }
// }




// services/api.js
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { auth } from "../utils/firebase"; // Import firebase auth

// Create axios instance with default config
const api = axios.create({
  baseURL: serverUrl,
  withCredentials: true
});

// Add token to every request
api.interceptors.request.use(async (config) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error adding token:", error);
  }
  return config;
});

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await api.get("/api/user/currentuser");
    dispatch(setUserData(result.data));
    return result.data;
  } catch (error) {
    console.log("Error in getCurrentUser:", error.response?.data || error.message);
  }
};

export const generateNotes = async (payload) => {
  try {
    const result = await api.post("/api/notes/generate-notes", payload);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const downloadPdf = async (result) => {
  try {
    const response = await api.post("/api/pdf/generate-pdf", { result }, {
      responseType: "blob"
    });

    const blob = new Blob([response.data], {
      type: "application/pdf"
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ExamNotesAI.pdf";
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error("PDF download failed");
  }
};
