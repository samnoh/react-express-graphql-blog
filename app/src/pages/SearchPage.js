import React from 'react';
import qs from 'qs';
import styled from 'styled-components';

import PageTemplate from 'components/common/PageTemplate';
import SearchPost from 'components/post/SearchPost';

const Title = styled.h1`
    margin-bottom: 40px;
`;

const SearchPage = ({ location }) => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });

    return (
        <PageTemplate>
            <Title>Result for "{query.q}"</Title>
            <SearchPost query={query.q} />
        </PageTemplate>
    );
};

export default SearchPage;