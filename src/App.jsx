import axios from 'axios';
import React from 'react';
import './App.css';
import dt from '../db.json';
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBRow,
    MDBCol,
    MDBContainer,
    MDBBtn,
    MDBBtnGroup,
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink,
} from 'mdb-react-ui-kit';
function App() {
    const [data, setData] = React.useState([]);
    const [value, setValue] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(0);
    const [pageLimit] = React.useState(5);
    const sortOptions = ['name', 'address', 'email', 'phone', 'status'];
    console.log(dt.users.length / pageLimit);
    React.useEffect(() => {
        loadData(0, 5, 0);
    }, []);
    const loadData = async (start, end, increase) => {
        const response = await axios.get(`http://localhost:3000/users?_start=${start}&_end=${end}`);
        if (response.data) {
            setData(response.data);
        }
        setCurrentPage(currentPage + increase);
    };
    const handleReset = () => {
        loadData(0, 5, 0);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await axios.get(`http://localhost:3000/users?q=${value}`);
        if (response.data) {
            setData(response.data);
            setValue('');
        }
    };
    const sort = async (value) => {
        const response = await axios.get(`http://localhost:3000/users?_sort=${value}&_order=asc
`);
        setData(response.data);
    };
    const handleSort = (e) => {
        const value = e.target.value;
        sort(value);
    };

    const handleFilter = async (value) => {
        const response = await axios.get(`http://localhost:3000/users?status=${value}`);
        setData(response.data);
    };

    const renderPagination = () => {
        if (currentPage === 0) {
            return (
                <MDBPagination>
                    <MDBPaginationItem>
                        <MDBPaginationLink>1</MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadData(5, 10, 1)}>Next</MDBBtn>
                    </MDBPaginationItem>
                </MDBPagination>
            );
        } else if (data.length === pageLimit && currentPage !== dt.users.length / pageLimit - 1) {
            return (
                <MDBPagination>
                    <MDBPaginationItem>
                        <MDBBtn
                            onClick={() => loadData((currentPage - 1) * 5, currentPage * 5, -1)}
                        >
                            Prev
                        </MDBBtn>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn
                            onClick={() =>
                                loadData((currentPage + 1) * 5, (currentPage + 2) * 5, 1)
                            }
                        >
                            Next
                        </MDBBtn>
                    </MDBPaginationItem>
                </MDBPagination>
            );
        } else {
            return (
                <MDBPagination>
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadData(5, 10, -1)}>Prev</MDBBtn>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                    </MDBPaginationItem>
                </MDBPagination>
            );
        }
    };
    return (
        <MDBContainer>
            <form
                style={{
                    margin: 'auto',
                    padding: '15px',
                    maxWidth: '400px',
                    alignContent: 'center',
                }}
                className="d-flex input-group w-auto"
                onSubmit={handleSearch}
            >
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <MDBBtn type="submit" color="success">
                    Search
                </MDBBtn>
                <MDBBtn color="info" type="button" className="mx-2" onClick={handleReset}>
                    Reset
                </MDBBtn>
            </form>
            <div style={{ marginTop: '30px' }}>
                <h2 className="text-center">
                    Search, Filter, Sort and Pagination using JSON Fake Rest API
                </h2>
                <MDBRow>
                    <MDBCol size={12}>
                        <MDBTable>
                            <MDBTableHead dark>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                </tr>
                            </MDBTableHead>
                            {data.length === 0 ? (
                                <MDBTableBody>
                                    <tr>
                                        <td colSpan={8} className="text-center mb-0">
                                            No Data Found
                                        </td>
                                    </tr>
                                </MDBTableBody>
                            ) : (
                                data.map((item, index) => {
                                    return (
                                        <MDBTableBody key={item.id}>
                                            <tr>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.address.street}</td>
                                                <td>{item.status}</td>
                                            </tr>
                                        </MDBTableBody>
                                    );
                                })
                            )}
                        </MDBTable>
                    </MDBCol>
                </MDBRow>
                <div
                    style={{
                        margin: 'auto',
                        padding: '15px',
                        maxWidth: ' 250px',
                        alignContent: 'center',
                    }}
                >
                    {renderPagination()}
                </div>
                <MDBRow>
                    <MDBCol size={8}>
                        <h5>Sort by:</h5>
                        <select
                            style={{ width: '50%', borderRadius: '2px', height: '35px' }}
                            onChange={handleSort}
                            defaultValue={'DEFAULT'}
                        >
                            <option value="DEFAULT" disabled>
                                Choose a salutation ...
                            </option>

                            {sortOptions.map((option, index) => {
                                return (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                );
                            })}
                        </select>
                    </MDBCol>
                    <MDBCol size={4}>
                        <h5>Filter by status</h5>
                        <MDBBtnGroup>
                            <MDBBtn color="success" onClick={() => handleFilter('Active')}>
                                Active
                            </MDBBtn>
                            <MDBBtn
                                style={{ marginLeft: '2px' }}
                                color="danger"
                                onClick={() => handleFilter('Inactive')}
                            >
                                Inactive
                            </MDBBtn>
                        </MDBBtnGroup>
                    </MDBCol>
                </MDBRow>
            </div>
        </MDBContainer>
    );
}

export default App;
