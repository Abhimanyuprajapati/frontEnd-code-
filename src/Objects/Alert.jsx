import Swal from "sweetalert2";
const alertinstance = (x) => {
    if(x.data.error === false) {
        Swal.fire({
            title: 'notification',
            text: x.data.message,
            icon: 'success',  
        })
    }
    else{
        Swal.fire({
            title: 'error',
            text: x.data.message,
            icon: 'error',
            })
    }
}   

export default alertinstance; 