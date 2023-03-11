import React from 'react';
const Pagination = (props) => {
    const { pagination, onPageChange } = props;
    const { _limit, _page, _totalRows } = pagination;

    const handlePageChange = (newPage) => {
        if (onPageChange) {
            onPageChange(newPage);
        }
    };
    return (
        <div>
            {_page <= 1 ? ' ' : <button onClick={() => handlePageChange(_page - 1)}>Prev</button>}
            {_page}
            {_page >= Math.ceil(_totalRows / _limit) ? (
                ''
            ) : (
                <button onClick={() => handlePageChange(_page + 1)}>Next</button>
            )}
        </div>
    );
};

export default Pagination;
