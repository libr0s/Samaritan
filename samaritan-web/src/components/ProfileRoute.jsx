import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {CssBaseline, Paper, Typography} from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar/Avatar";
import Chip from "@material-ui/core/Chip/Chip";
import LocationCityIcon from '@material-ui/icons/LocationCity';
import TimeAgo from 'react-timeago';
import {Planet} from 'react-kawaii';
import {getHeaders} from "../utils"

const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        height: theme.spacing.unit * 16,
        width: theme.spacing.unit * 16,
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    cityContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        '& > div': {
            margin: '1em',
        }
    },
    action: {
        textAlign: 'center',
    }
});

class ProfileRoute extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            surname: '',
            points: 0,
            city: '',
            action: {
                name: '',
                end_date: '',
                organisation: '',
            },
            quoute: '',
        };
    }

    componentDidMount() {
        this.getProfileInfo();
    }

    getProfileInfo = () => {
        fetch('/profile', {
            method: 'GET',
            headers: getHeaders(),
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({
                    name: json.name,
                    surname: json.surname,
                    city: json.city,
                    code: json.post_code,
                });
            }).then(() => {

        });

        fetch('/actions', {
            method: 'GET',
            headers: getHeaders(),
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                const action = json.sort((a1, a2) => Date(a1.end_date) > Date(a2.end_date))[0];
                console.log(action);
                this.setState({action});
            });

        fetch('https://api.adviceslip.com/advice', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({quoute: json.slip.advice});
            });
    };

    render() {
        const {classes} = this.props;
        const {quoute, action, name, city, code} = this.state;
        
        return (
            <React.Fragment>
                <CssBaseline/>
                <Paper
                    className={classes.paper}>
                    <Avatar
                        className={classes.avatar}
                        alt={name}
                        src={"https://static.goldenline.pl/user_photo/093/user_4527709_e860d3_huge.jpg"}/>
                    <Typography variant="h4">
                        {name}
                    </Typography>
                    <div className={classes.cityContainer}>
                        <Chip color={"primary"} avatar={<Avatar><LocationCityIcon/></Avatar>} label={`${city}, ${code}`}/>
                    </div>
                    <div className={classes.action}>
                        <Typography>
                            {action ? action.name + " which you organise ends in <TimeAgo date={action.end_date}/>. Do your best!"
                                    : "Currently you have no events being organised "}
                        </Typography>
                    </div>
                </Paper>
                <div style={{textAlign: 'center', display: 'flex', alignContent: 'center', flexDirection: 'column', marginTop: '2em'}}>
                    <Planet size={120} mood="happy" color="#1133AF" />
                    <Typography variant={"body2"}>
                        {quoute}...
                    </Typography>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ProfileRoute);
