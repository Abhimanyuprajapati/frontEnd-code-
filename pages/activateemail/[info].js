import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import withRedirect from '../../components/Auth/Redirect';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={8} ref={ref} variant="filled" {...props} />;
  });
  
const Activateemail = () => {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [flag ,setflag]=useState(false)
    const [message,setmessage]=useState('')
    const [status,setstatus]=useState('')
    useEffect(()=>{
        if(!router.isReady){}
        setOpen(true)
        setmessage(router.query.message)
        setstatus(router.query.status)
        if(router.query.status === 'true'){
            setflag(false)
            setTimeout(()=>{
              router.replace('/login')
            },[3000])
        }else{
            setflag(true)
            router.replace('/register')
        }
       
        
    },[router.isReady])

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    const action = (
        <React.Fragment>
          <IconButton
            size="medium"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

const vertical = 'top'
const horizontal = 'center'

  return (
    <div className='activate'>
    <h1>Activate Email</h1>
    <p>please wait, you will be redirected ... </p>
    {flag ? 
    <Snackbar open={open} autoHideDuration={12000} onClose={handleClose} style={{'marginTop':'200px'}}anchorOrigin={{ vertical, horizontal }}>
    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
    :
    <Snackbar open={open} autoHideDuration={12000} onClose={handleClose} style={{'marginTop':'200px'}}anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
    </Snackbar>
    }
  </div>
  )
}

export default withRedirect(Activateemail) 