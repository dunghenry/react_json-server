import axios from 'axios';
import React from 'react';
import queryString from 'query-string';
import { MDBContainer } from 'mdb-react-ui-kit';
import Pagination from '../components/Pagination';
function Posts() {
    const [filters, setFilters] = React.useState({
        _limit: 10,
        _page: 1,
    });
    const [pagination, setPagination] = React.useState({
        _page: 1,
        _limit: 10,
        _totalRows: 100,
    });
    const [posts, setPosts] = React.useState([]);
    React.useEffect(() => {
        (async () => {
            const paramsString = queryString.stringify(filters);
            console.log(paramsString);
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/posts?${paramsString}`,
            );
            if (response.data) {
                setPosts(response.data);
                setPagination({
                    ...pagination,
                    _page: filters._page,
                });
            }
        })();
    }, [filters]);
    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            _page: newPage,
        });
    };
    return (
        <MDBContainer>
            {posts.map((post) => {
                return <li key={post.id}>{post.title}</li>;
            })}
            <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </MDBContainer>
    );
}

export default Posts;
