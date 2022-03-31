import SimpleToast from './SimpleToast';
import { ToastContainer as TC } from 'react-bootstrap';


function ToastContainer(props) {
    
    return (<>
        <TC position="top-end" className="p-3">
            <SimpleToast notificationType={props.notificationType} notificationHeaderMessage={props.notificationHeaderMessage} notificationMessage={props.notificationMessage} show={props.show} />
        </TC>
    </>);

}

export default ToastContainer;