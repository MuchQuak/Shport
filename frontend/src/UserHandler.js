import axios from "axios";
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'

export async function addUser(user){
    try {
        const response = await axios.post('http://localhost:5000/users', user);
        return response;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

export async function validateNewUsername(username){
    try{
        const response = await axios.post('http://localhost:5000/signup/username', {"username":username});
        return response;
    }
    catch (error){
        console.log(error);
        return false;
    }
}


export async function validateNewEmail(email){
    try{
        const response = await axios.post('http://localhost:5000/signup/email', {"email":email});
        return response;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

export function AlertHandler(props){    
    if(props.isAlertVisible){
      return (
        <>
        <p>{props.alertMessage}</p>
        </>
      )
    }
    else{
      return (<></> )
    }
  };

  export function AlertHandler2(props){    
    
    function closeBox(){
        props.isVis = false;
      }

    return (
        <div>
            {props.isVis && (
                <>
                <ReactDialogBox
                    closeBox={closeBox}
                    modalWidth='60%'
                    headerBackgroundColor='blue'
                    headerTextColor='white'
                    headerHeight='65'
                    closeButtonColor='white'
                    bodyBackgroundColor='white'
                    bodyTextColor='black'
                    bodyHeight='200px'
                    headerText='Invalid Input'
                >
                    <div>
                    <h1>{props.alertMessage}</h1>
                    </div>
                </ReactDialogBox>
                </>
            )}
        </div>

)};