import {baseApi} from "../../../shared/api/api.ts";
import type {PostType} from "../model/post.type.ts";
import type {PaginatorType} from "../../../shared/types/paginator.type.ts";
import type {CreatePostType} from "../model/types/createPost.type.ts";
import type {UpdatePostType} from "../model/types/updatePost.type.ts";


type GetAllPostsQuery = {
    titleSearchTerm: string
}

export const postsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllPosts: builder.query<PaginatorType<PostType>, GetAllPostsQuery>({
            query: ({titleSearchTerm}:GetAllPostsQuery) => `posts?TitleSearchTerm=${titleSearchTerm}`,
            providesTags: (result) =>
                result
                    ? [...result.items.map(({id}) => ({type: 'Posts' as const, id})), {type: 'Posts', id: 'LIST'}]
                    : [{type: 'Posts', id: 'LIST'}],

        }),

        getPostById: builder.query<PostType, string>({
            query: (id) => `posts/${id}`,
            providesTags: (result, error, id) => [{ type: 'Posts', id }]
        }),

        createPost: builder.mutation<PostType, CreatePostType>({
            query: (newPost) => ({
                url: 'posts',
                method: 'POST',
                body: newPost,
            }),
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
        }),

        deletePostById: builder.mutation<{success:boolean}, string>({
            query: (id:string) => ({
                url: `posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id:string) =>
                [{ type: 'Posts', id }],
        }),

        updatePostById: builder.mutation<{success:boolean}, UpdatePostType>({
            query: ({id, ...post}) => ({
                url: `posts/${id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: (result, error, {id}) =>
                [{ type: 'Posts', id }],
        }),


    })
})


export const {
    useGetAllPostsQuery,
    useGetPostByIdQuery,
    useUpdatePostByIdMutation,
    useDeletePostByIdMutation,
    useCreatePostMutation
} = postsApi;
