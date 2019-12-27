import React, { useCallback, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import 'highlight.js/styles/darcula.css';

import { showNoti } from 'store/actions/noti';
import { GET_POST, DELETE_POST } from 'graphql/queries';
import ErrorPage from 'pages/ErrorPage';
import LoadingPage from 'pages/LoadingPage';
import Comments from 'components/post/Comments';
import PostDetailTemplate from 'components/post/PostDetailTemplate';
import PostDetailTitle from 'components/post/PostDetailTitle';
import palette from 'styles/palette';

const PostDetailContainer = styled.section`
    padding-bottom: 40px;
    margin-bottom: 40px;
    flex-grow: 1;
`;

const Description = styled.div`
    padding: 4px;
    font-size: 17px;

    .ql-syntax {
        background: ${palette.gray[9]};
        color: ${palette.gray[1]};
        padding: 10px 14px;
        border-radius: 6px;
        font-size: 15px;
    }
`;

const PostDetail = ({ history, id }) => {
    const dispatch = useDispatch();

    const { called, loading, error, data: { post } = {}, refetch } = useQuery(GET_POST, {
        variables: { id },
        fetchPolicy: 'cache-and-network'
    });
    const [deletePost, { data: isDeleted }] = useMutation(DELETE_POST);

    useEffect(() => {
        if (isDeleted) {
            history.push('/', { notiOnNextPage: true });
            dispatch(showNoti('Successfully deleted', 'danger', 3));
        }
    }, [isDeleted, dispatch, history]);

    const onEdit = useCallback(() => {
        history.push(`/post/${id}/edit`, {
            id,
            title: post.title,
            content: post.content
        });
    }, [post, id, history]);

    const onDelete = useCallback(() => {
        deletePost({ variables: { id } });
    }, [id, deletePost]);

    if (error) return <ErrorPage />;

    if (!called || loading) return <LoadingPage />;

    return (
        <PostDetailTemplate>
            <PostDetailContainer>
                <PostDetailTitle {...post} onEdit={onEdit} onDelete={onDelete} />
                <Description
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="ql-editor"
                />
            </PostDetailContainer>
            <Comments comment={post.comment} id={id} refetch={refetch} />
        </PostDetailTemplate>
    );
};

export default withRouter(PostDetail);
