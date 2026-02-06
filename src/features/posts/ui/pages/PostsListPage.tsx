import {Post} from "../components/Post.tsx";
import type {PostType} from "../../model/post.type.ts";
import {Link} from "react-router-dom";
import {useGetAllPostsInfiniteQuery} from "../../api/post.api.ts";
import {AddNewPostFabButton} from "../components/AddNewPostFab.tsx";
import {useState} from "react";
import {useDebounce} from "../../../../shared/hooks/useDebounce.ts";
import {Virtuoso} from "react-virtuoso";
import {PostSkeleton} from "../components/skeleton/PostSkeleton.tsx";
import {NotFound} from "../../../../shared/ui/NotFound.tsx";


export function PostsListPage() {
    const PAGE_SIZE = 10;

    const [inputValue, setInputValue] = useState("")
    const debounce = useDebounce(inputValue, 500)

    const {
        data,
        isFetchingNextPage,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
    } = useGetAllPostsInfiniteQuery({titleSearchTerm: debounce, pageSize: PAGE_SIZE});

    const loadNextPage = () => {
        if (isFetchingNextPage || !hasNextPage) return
        fetchNextPage()
    }

    if (!isFetchingNextPage && !data || isError) return <NotFound/>;

    return (
        <div>
            <AddNewPostFabButton/>
            <nav className="py-5 flex justify-center">
                <input className="form-input border-white/10 focus:border-white" disabled={isLoading} value={inputValue}
                       onChange={(e) => setInputValue(e.target.value)}
                       type="text"/>
            </nav>

            {isLoading ?
                [...Array(10)].map((_, i) => (

                    <div className="mb-4" key={i}>
                        <PostSkeleton/>
                    </div>))

                :
                <Virtuoso useWindowScroll
                          data={data?.pages.flatMap(page => page.items) || []}
                          endReached={loadNextPage}
                          itemContent={(index, post: PostType) => (
                              <div className="mb-4">
                                  <Link to={`/posts/${post.id}`} key={index}>
                                      <Post
                                          title={post.title}
                                          description={post.description}
                                          content={post.content}/>
                                  </Link>
                              </div>
                          )}
                />
            }

        </div>

    )
}