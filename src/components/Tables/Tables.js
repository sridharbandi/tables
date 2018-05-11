import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TablePagination,
    TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Pagination from './Pagination';
import Tablehead from './Tablehead';
import Header from '../Header/Header';
import Aux from '../../hoc/Aux';

let counter = 0;
function createData(firstname, lastname, age) {
    counter += 1;
    return { id: counter, firstname, lastname, age };
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    textcolor: {
        color: 'white',
        textAlign: 'center'
    }
});

class Tables extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            data: [
                createData('Adam', 'Gill', 23),
                createData('Adrian', 'Graham', 25),
                createData('Alan', 'Gray', 16),
                createData('Alexander', 'Hamilton', 32),
                createData('Andrew', 'Ince', 42),
                createData('Anthony', 'Jackson', 27),
                createData('Austin', 'Kelly', 29),
                createData('Benjamin', 'Jones', 31),
                createData('Blake', 'Lambert', 37),
                createData('Boris', 'Lee', 26),
                createData('Brandon', 'Marshall', 21),
                createData('Brian', 'Martin', 23),
                createData('Cameron', 'McDonald', 24),
            ],
            page: 0,
            rowsPerPage: 5,
            user: '#',

        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    deleteHandler = (name) => {
        this.setState({ user: 'Selected the user ' + name })
    }

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Aux>
                <Header />
                <Grid container justify='center' spacing={0}>
                    <Grid item xs={11} sm={6} >
                        <Paper className={classes.root}>
                            <div className={classes.tableWrapper}>
                                <Table className={classes.table}>
                                    <Tablehead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={this.handleSelectAllClick}
                                        onRequestSort={this.handleRequestSort}
                                        rowCount={data.length}
                                    />
                                    <TableBody>
                                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                            return (
                                                <TableRow key={n.id}>
                                                    <TableCell>{n.firstname}</TableCell>
                                                    <TableCell numeric>{n.lastname}</TableCell>
                                                    <TableCell numeric>{n.age}</TableCell>
                                                    <TableCell numeric>
                                                        <Button
                                                            onClick={() => this.deleteHandler(n.firstname + ' ' + n.lastname)}
                                                            size="small"
                                                            variant="raised"
                                                            color="secondary">
                                                            Click
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 48 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                colSpan={3}
                                                count={data.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onChangePage={this.handleChangePage}
                                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                                Actions={Pagination}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </div>
                        </Paper>
                        <br />
                        <Typography className={classes.textcolor} variant="headline" component="h3">
                            {this.state.user}
                        </Typography>
                        <br />
                        <br />
                    </Grid>
                </Grid>
            </Aux>
        );
    }
}

export default withStyles(styles)(Tables);