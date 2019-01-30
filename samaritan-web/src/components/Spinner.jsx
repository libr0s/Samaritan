import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    root: {
        display: 'block',
        margin: '0 auto',
        borderColor: 'red',
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    }
});

class Spinner extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <PulseLoader
                    sizeUnit={"em"}
                    size={2}
                    color={'#123abc'}
                    loading={true}
                />
            </div>
        )
    }
}

export default withStyles(styles)(Spinner);
