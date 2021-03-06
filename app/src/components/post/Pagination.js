import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { palette, media } from 'styles';

const Container = styled.div`
    display: flex;
    width: 400px;
    margin: 0 auto;
    justify-content: space-around;

    ${media.tablet`
        width: 90%;
    `};
`;

const PageNum = styled(Link)`
    display: block;
    padding: 10px;
    color: ${palette.gray[4]};
    user-select: none;

    &.active {
        color: ${palette.gray[8]};
        font-weight: 600;
    }
`;

const Pagination = ({ currPage = 1, total, nPostOnPage }) => {
    const nPagination = 5;
    const counts = Math.ceil(total / nPostOnPage);
    const nextPage = useMemo(() => {
        return Math.ceil(currPage / 5) * 5 + 1;
    }, [currPage]);

    const prevPage = useMemo(() => {
        const result = Math.ceil(currPage / 5) * 5 - 9;
        return result <= 0 ? 1 : result;
    }, [currPage]);

    const offset = useMemo(() => {
        return Math.ceil(currPage / 5) * 5 - 5;
    }, [currPage]);

    const onClick = useCallback(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container>
            {offset > 4 && (
                <>
                    <PageNum to={'?page=1'} onClick={onClick}>
                        {'<<'}
                    </PageNum>
                    <PageNum to={`?page=${prevPage}`} onClick={onClick}>
                        {'<'}
                    </PageNum>
                </>
            )}
            {Array(...Array(counts > nPagination ? nPagination : counts))
                .map((_, i) => i + 1 + offset)
                .map(e => {
                    return e - 1 >= counts ? null : (
                        <PageNum
                            key={e}
                            to={`?page=${e}`}
                            onClick={onClick}
                            className={currPage === e && 'active'}>
                            {e}
                        </PageNum>
                    );
                })}
            {nextPage * nPostOnPage - nPostOnPage - total < 0 && (
                <PageNum to={`?page=${nextPage}`} onClick={onClick}>
                    {'>'}
                </PageNum>
            )}
        </Container>
    );
};

export default Pagination;
