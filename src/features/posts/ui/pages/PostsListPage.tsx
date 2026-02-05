import {Post} from "../components/Post.tsx";
import type {PostType} from "../../model/post.type.ts";
import {Link} from "react-router-dom";
import {useGetAllPostsQuery} from "../../api/post.api.ts";
import {AddNewPostFabButton} from "../components/AddNewPostFab.tsx";
import {useState} from "react";
import {useDebounce} from "../../../../shared/hooks/useDebounce.ts";


export function PostsListPage() {

    const [inputValue,setInputValue] = useState("")
    const debounce = useDebounce(inputValue,500)

    const {
        data,
        isLoading,
        error
    } = useGetAllPostsQuery({titleSearchTerm:debounce});



    if (isLoading) return <div>LOADING...</div>;
    if (error) return <div>ERROR</div>;

    return (
        <div>
            <AddNewPostFabButton/>
            <nav className="py-5 flex justify-center">

                     <input className="form-input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text"/>



            </nav>

            <div className="grid grid-cols-1 gap-y-5">
                {data?.items.map((post: PostType) =>
                    <Link to={`/posts/${post.id}`} key={post.id}>
                        <Post
                            title={post.title}
                            description={post.description}
                            content={post.content}/>
                    </Link>)}
            </div>
        </div>

    )
}