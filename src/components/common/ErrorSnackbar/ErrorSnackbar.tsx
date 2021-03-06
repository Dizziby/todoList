import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {AppDispatchType} from "../../../redux/store";
import {useDispatch} from "react-redux";
import {setAppErrorAC} from "../../../redux/reducers/app-reducer";
import {useAppSelector} from "../hooks/useAppSelector";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {

    const error = useAppSelector(state => state.app.error)
    const dispatch: AppDispatchType = useDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC({error: null}))
    };

    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error} 😠
            </Alert>
        </Snackbar>
    );
}
