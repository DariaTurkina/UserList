import React from 'react';
import './styles.scss';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

const useStyles1 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2.5),
    }
}));

function TablePaginationActions(props) {

    const useStyles = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    function handleFirstPageButtonClick(event) {
        onChangePage(event, 0);
    }

    function handleBackButtonClick(event) {
        onChangePage(event, page - 1);
    }

    function handleNextButtonClick(event) {
        onChangePage(event, page + 1);
    }

    function handleLastPageButtonClick(event) {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    return (
        <div className={useStyles.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    chip: {
        margin: theme.spacing(1),
    }
}));

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

// const axios = require('axios');
// const path = "http://someHost:somePort";

export default function CurrentItem(props) {

    // componentDidMount() {
    // axios.get(`${path}/${this.props.userID}`)
    //     .then(res => {
    //         this.setState({ user: res });
    //     })
    //     .catch(err => {
    //         this.notify(err);
    //     })
    // }

    const useStyles = useStyles2();
    const item = props.item[0];
    const array = props.tabState ? item.array : item.members;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, array.length - page * rowsPerPage);

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    return (
        <div className="currentitem">

            <div className="personalInfo">
                <Paper className={useStyles.rootTable}>
                    <Table className={useStyles.table}>
                        <TableHead>
                            <TableRow>
                                {props.tabState && <StyledTableCell align="center">User ID</StyledTableCell>}
                                {props.tabState && <StyledTableCell align="center">User name</StyledTableCell>}
                                {!props.tabState ?
                                    <StyledTableCell align="center">Group name</StyledTableCell> :
                                    <StyledTableCell align="center">Company name</StyledTableCell>
                                }

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow key={props.tabState ? item.user_id : item.name}>
                                {props.tabState &&
                                    <StyledTableCell align="center">
                                        {item.user_id}
                                    </StyledTableCell>
                                }
                                <StyledTableCell align="center">{item.name}</StyledTableCell>
                                {props.tabState &&
                                    <StyledTableCell align="center">{item.company_name}</StyledTableCell>
                                }
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>

            <div className="listOfArrays">
                <h3>
                    <span>{props.tabState ? "Friends" : "Members"}</span>
                </h3>
            </div>

            <div className="arraylist">
                <Paper className={useStyles.root}>
                    <div className={useStyles.tableWrapper}>
                        <Table className={useStyles.table}>
                            <TableBody>
                                {array.map(row => (
                                    <TableRow key={row.name}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            onClick={() => props.goToCurItem(row.name)}
                                        >
                                            <Chip
                                                icon={<FaceIcon />}
                                                className={useStyles.chip}
                                            />
                                            {row.name}
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {/* emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            ) */}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10]}
                                        colSpan={3}
                                        count={array.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </Paper>
            </div>
            {/* 
            <div className="friends">
                <div className="friendsList">
                    <h3>
                        <span>{props.tabState}</span>
                    </h3>
                </div>
                <List component="nav" className={useStyles.root} aria-label="mailbox folders">
                    <Divider />
                    {this.showFriendList(props.user[0].array)}
                </List>
            </div>*/}
        </div>
    )
}
