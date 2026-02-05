import './App.css'
import {Header} from "./shared/ui/Header.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {PostsListPage} from "./features/posts/ui/pages/PostsListPage.tsx";
import {PostInfoPage} from "./features/posts/ui/pages/PostInfoPage.tsx";
import {CreatePostPage} from "./features/posts/ui/pages/CreatePostPage.tsx";
import {UpdatePostPage} from "./features/posts/ui/pages/UpdatePostPage.tsx";
import {NotFound} from "./shared/ui/NotFound.tsx";


function App() {

    return (
        <>
            <Header/>
            <main className="min-w-[320px] max-w-4xl mx-auto px-8 py-6">
                <Routes>
                    <Route path="/" element={<Navigate to="/posts" replace/>}/>
                    <Route path="/posts" element={<PostsListPage/>}/>
                    <Route path="/posts/:id" element={<PostInfoPage/>}/>
                    <Route path="/posts/new" element={<CreatePostPage/>}/>
                    <Route path="/posts/:id/update" element={<UpdatePostPage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
        </>
    )
}

export default App
