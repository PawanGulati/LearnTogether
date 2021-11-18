import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAuthMessage, selectAuthMessageType, selectAuthMessageState } from '../../store/user-store/user-selectors';
import { auth_message } from '../../store/user-store/user-actions';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapStateToProps = createStructuredSelector({
    auth_message: selectAuthMessage,
    auth_message_type: selectAuthMessageType,
    pop_state: selectAuthMessageState
})

const mapDispatchToProps = dispatch =>({
    set_auth_message: (message, type, open) => dispatch(auth_message(message, type, open))
})

export default connect(mapStateToProps,mapDispatchToProps)(function SnackbarComp(props) {
    
    const {
        auth_message,
        auth_message_type,
        pop_state,
        set_auth_message
    } = props

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        set_auth_message('','success',false);
    };

    return (
        <Snackbar open={pop_state} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={auth_message_type}>
                {auth_message}
            </Alert>
        </Snackbar>
    )
})
