import {api} from "../../../shared/api/api.ts";
import type {PaginatorType} from "../../../shared/types/paginator.type.ts";
import type {PostType} from "../model/post.type.ts";
import type {PostFormValues} from "../model/validators/post.validator.ts";


const BASE_POST_URL = "/posts/"

export const postsApi = {

    async getAll(): Promise<PaginatorType<PostType>> {
        const result = await api.get(BASE_POST_URL)
        return result.data
    },

    async getById(id: string): Promise<PostType> {
        const result = await api.get(BASE_POST_URL + id)
        return result.data
    },

    async deleteById(id: string): Promise<boolean> {
        const result = await api.delete(BASE_POST_URL + id)
        return result.status === 204
    },

    async createPost(post: PostFormValues): Promise<number> {
        const result = await api.post(BASE_POST_URL, post)
        return result.data
    },

    async updatePost(post: PostFormValues, id:string): Promise<boolean> {
        const result = await api.put(BASE_POST_URL + id, post)
        return result.status === 204
    }
}