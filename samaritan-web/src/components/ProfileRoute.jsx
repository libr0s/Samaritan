import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Paper, CssBaseline, Typography} from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar/Avatar";
import Chip from "@material-ui/core/Chip/Chip";
import GradeIcon from '@material-ui/icons/Grade';
import AssessmentIcon from '@material-ui/icons/Assessment';
import TimeAgo from 'react-timeago';
import {Planet} from 'react-kawaii';

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
    rankContainer: {
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
            rank: '',
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
        const token = 'Bearer ' + localStorage.getItem('access_token');
        const reqHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        fetch('/profile', {
            method: 'GET',
            headers: reqHeaders,
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({
                    name: json.name,
                    surname: json.surname,
                    points: json.points,
                    rank: json.rank,
                });
            }).then(() => {

        });

        fetch('/actions', {
            method: 'GET',
            headers: reqHeaders,
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
        const {quoute, action, name, surname, points, rank} = this.state;

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
                        {`${name} ${surname}`}
                    </Typography>
                    <div className={classes.rankContainer}>
                        <Chip color={"primary"} avatar={<Avatar><GradeIcon/></Avatar>} label={rank}/>
                        <Chip color={"primary"} avatar={<Avatar><AssessmentIcon/></Avatar>} label={`${points} pkt`}/>
                    </div>
                    <div className={classes.action}>
                        <Typography>
                            {action.name} organised by {action.organisation.name} which you participate in, ends in <TimeAgo date={action.end_date}/>. Do your best!
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
