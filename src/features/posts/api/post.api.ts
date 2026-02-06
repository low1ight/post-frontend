import {baseApi} from "../../../shared/api/api.ts";
import type {PostType} from "../model/post.type.ts";
import type {PaginatorType} from "../../../shared/types/paginator.type.ts";
import type {CreatePostType} from "../model/types/createPost.type.ts";
import type {UpdatePostType} from "../model/types/updatePost.type.ts";


type GetAllPostsQuery = {
    titleSearchTerm: string
    pageSize: number
}


export const postsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllPosts: builder.infiniteQuery<PaginatorType<PostType>, GetAllPostsQuery, number>({
            infiniteQueryOptions: {
                initialPageParam: 1,
                getNextPageParam: ({pageNumber, pageSize, totalItemsCount}: PaginatorType<PostType>) => {
                    if (pageNumber < Math.ceil(totalItemsCount / pageSize)) {
                        return pageNumber + 1
                    }
                    return undefined

                },
            },
            query({queryArg, pageParam}) {
                return {
                    url: "posts",
                    params: {
                        titleSearchTerm: queryArg.titleSearchTerm,
                        pageSize: queryArg.pageSize,
                        pageNumber: pageParam
                    }
                }

            }}),

        getPostById: builder.query<PostType, string>({
            query: (id) => `posts/${id}`,
            providesTags: (result, error, id) => [{type: 'Posts', id}]
        }),

        createPost: builder.mutation<PostType, CreatePostType>({
            query: (newPost) => ({
                url: 'posts',
                method: 'POST',
                body: newPost,
            }),
            invalidatesTags: [{type: 'Posts', id: 'LIST'}],
        }),

        deletePostById: builder.mutation<{ success: boolean }, string>({
            query: (id: string) => ({
                url: `posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Posts', id: 'LIST'}]
        }),

        updatePostById: builder.mutation<{ success: boolean }, UpdatePostType>({
            query: ({id, ...post}) => ({
                url: `posts/${id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: (result, error, {id}) =>
                [{type: 'Posts', id}],
        }),


    })
})


export const {
    useGetAllPostsInfiniteQuery,
    useGetPostByIdQuery,
    useUpdatePostByIdMutation,
    useDeletePostByIdMutation,
    useCreatePostMutation
} = postsApi;
