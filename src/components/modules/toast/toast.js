import toast from "react-hot-toast"

const successToast =(title)=>{
    toast.success(title)
}
const errorToast = (title)=>{
    toast.error(title)
}
export{
    successToast,
errorToast
}