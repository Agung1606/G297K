import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "grkApi",
    tagTypes: [
        "Posts", 
        "User",
        "Search"
    ],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (values) => ({
                url: "/api/v1/auth/login",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: values,
            }),
        }),
        registerUser: builder.mutation({
            query: (values) => ({
                url: "/api/v1/auth/register",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: values,
            }),
        }),
        registerUsername: builder.mutation({
            query: ({ values, userId }) => ({
                url: "/api/v1/auth/register/username?" + new URLSearchParams({ userId: userId}),
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: values,
            }),
        }),
        getFeedPosts: builder.query({
            query: (token) => ({
                url: "/api/v1/post",
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["Posts"]
        }),
        getUserPosts: builder.query({
            query: ({ userId, token }) => ({
                url: `/api/v1/post/${userId}`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["Posts"]
        }),
        addNewPost: builder.mutation({
            query: ({formData, token}) => ({
                url: "/api/v1/post/newpost",
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            }),
            invalidatesTags: ["Posts"]
        }),
        editPost: builder.mutation({
            query: (post) => ({
                url: `/api/v1/post/update/${post.postId}`,
                method: "PATCH",
                headers: { Authorization: `Bearer ${post.token}` },
                body: post,
            }),
            invalidatesTags: ["Posts"],
        }),
        likePost: builder.mutation({
            query: (post) => ({
                url: `/api/v1/post/like/${post.postId}`,
                method: "PATCH",
                headers: { Authorization: `Bearer ${post.token}` },
                body: post,
            }),
            invalidatesTags: ["Posts"],
        }),
        deletePost: builder.mutation({
            query: (post) => ({
                url: `/api/v1/post/delete/${post.postId}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${post.token}`},
            }),
            invalidatesTags: ["Posts"],
        }),
        commentPost: builder.mutation({
            query: (post) => ({
                url: '/api/v1/post/comment',
                method: 'POST',
                headers: { Authorization: `Bearer ${post.token}` },
                body: post
            }),
            invalidatesTags: ["Posts"]
        }),
        getUser: builder.query({
            query: ({ userId, token }) => ({
                url: `/api/v1/user/${userId}`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}`},
            }),
            providesTags: ["User"],
        }),
        addRemoveFollow: builder.mutation({
            query: (user) => ({
                url: `/api/v1/user/addremovefollow`,
                method: "PATCH",
                headers: { Authorization: `Bearer ${user.token}`},
                body: user,
            }),
            invalidatesTags: ["User"],
        }),
        updateProfile: builder.mutation({
            query: ({ data, token }) => ({
                url: '/api/v1/user/updateprofile',
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
                body: data
            }),
            invalidatesTags: ["User", "Posts"],
        }),
        deleteProfile: builder.mutation({
            query: (token) => ({
                url: `/api/v1/user/deleteprofile`,
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}`}
            }),
            invalidatesTags: ["User", "Posts"],
        }),
        updateUserInfo: builder.mutation({
            query: ({ data, token }) => ({
                url: '/api/v1/user/updateuserinfo',
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
                body: data
            }),
            invalidatesTags: ["User", "Posts"],
        }),
        searchUser: builder.query({
            query: ({ username, token }) => ({
                url: `/api/v1/user/search?username=${username}`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }),
            providesTags: ["Search"],
        }),
    }),
});

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useRegisterUsernameMutation,
    useGetFeedPostsQuery,
    useGetUserPostsQuery,
    useGetUserQuery,
    useAddNewPostMutation,
    useEditPostMutation,
    useLikePostMutation,
    useDeletePostMutation,
    useCommentPostMutation,
    useAddRemoveFollowMutation,
    useUpdateProfileMutation,
    useDeleteProfileMutation,
    useUpdateUserInfoMutation,
    useSearchUserQuery,
} = api;