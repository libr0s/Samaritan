import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {

    render() {
        const {open, handleClose} = this.props;

        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create new event</DialogTitle>
                    <DialogContent
                        style={{width: '60vh'}}
                    >
                        <DialogContentText>
                            Name of your event
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            type="name"
                            fullWidth
                        />
                        <DialogContentText>
                            Maximal amount of points
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="points"
                            type="number"
                            fullWidth
                        />
                        <DialogContentText>
                            Date
                        </DialogContentText>
                        <TextField
                            id="date"
                            type="date"
                            defaultValue="2019-01-09"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
