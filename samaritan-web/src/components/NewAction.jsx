import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MapComponent from './MapComponent';
import Geocode from "react-geocode";

Geocode.setApiKey("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

const token = 'Bearer ' + localStorage.getItem('access_token');
const reqHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': token
});

export default class FormDialog extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            description: '',
            points: 0,
            startDate: '2019-01-09',
            endDate: '2019-01-09',
            failedFetch: false,
            city: '',
            address: '',
            postalCode: '',
            geocode: {
                lat: '',
                lon: '',
                type: '',
            },
        };

    }

    onChange = (e) => {
        e.preventDefault();
    
        this.setState({
          [e.target.name]: e.target.value
        })
      }

    handleConfirm = (e) => {
        const {city, address, postalCode} = this.state;
        fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&street=${encodeURIComponent(address)}&postalcode=${encodeURIComponent(postalCode)}&format=json`, {
            method: 'GET'
        })
        .then(response => {
            console.log("response: ", response);
            return response.json();
        })
        .then(json => {
            const bestResponse = json[0]
            this.setState({geocode: {
                type: bestResponse.type,
                lat: bestResponse.lat,
                lon: bestResponse.lon
                }  
            })
            this.sendData(e);
        })
    }

    sendData = (e) => {
        const {name, description, points, startDate, endDate, geocode, city, address} = this.state;
        console.log("POST /actions");
        fetch('/actions', {
            method: 'POST',
            headers: reqHeaders,
            body: JSON.stringify({
                name: name,
                description: description,
                points: points,
                start_date: startDate,
                end_date: endDate,
                geo: {
                    name: city,
                    address: address,
                    type: geocode.type,
                    lat: geocode.lat,
                    lng: geocode.lon
                }
            })
        })
            .then(response => {                
                console.log("response: ", response.status);
                if(response.status !== 201)
                {
                    this.setState({failedFetch: true})
                }
                return response.json()
            })
            .then(json => {
                this.setState({failedFetch: false})
                console.log("JSON: ", json);
                this.setState({actions: json});
                this.props.handleClose(e);

        });


    }

    render() {
        const {open, handleClose} = this.props;
        const {name, description, points, startDate, endDate} = this.state;
        console.log(this.state);
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create new event</DialogTitle>
                    
                    <DialogContent
                        style={{width: '70vh'}}
                    >
                        <DialogContentText>
                            Name of your event
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            id="name"
                            value={name}
                            onChange={this.onChange}
                            type="name"
                            fullWidth
                        />
                        <DialogContentText>
                            Description of your event
                        </DialogContentText>
                        <TextField
                            autoFocus
                            multiline
                            name="description"
                            value={description}
                            rows="3"
                            onChange={this.onChange}
                            margin="dense"
                            id="description"
                            type="description"
                            fullWidth
                        />
                        <DialogContentText>
                            Maximal amount of points
                        </DialogContentText>
                        <TextField
                            autoFocus
                            name="points"
                            onChange={this.onChange}
                            margin="dense"
                            id="points"
                            value={points}
                            type="number"
                            fullWidth
                        />
                        <DialogContentText>
                            Start Date
                        </DialogContentText>
                        <TextField
                            id="start-date"
                            name="startDate"
                            type="date"
                            onChange={this.onChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            
                        />
                        <DialogContentText>
                            End Date
                        </DialogContentText>                        
                        <TextField
                            id="end-date"
                            name="endDate"
                            type="date"
                            onChange={this.onChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            
                        />
                        <hr />  
                        <DialogContentText>
                            City
                        </DialogContentText>                   
                        <TextField
                            id="city"
                            name="city"
                            type="text"
                            placeholer="Cityname"
                            onChange={this.onChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            
                        />
                        <DialogContentText>
                            Address
                        </DialogContentText>  
                        <TextField
                            id="address"
                            name="address"
                            type="text"
                            placeholer="Streetname 32"
                            onChange={this.onChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            
                        />
                        <DialogContentText>
                            Postal Code
                        </DialogContentText> 
                        <TextField
                            id="postalCode"
                            name="postalCode"
                            type="zip"
                            placeholder="12-345"
                            inputProps={{ pattern: '[0-9]*' }}
                            onChange={this.onChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleConfirm} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
