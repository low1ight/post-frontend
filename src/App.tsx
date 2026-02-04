import './App.css'
import {Header} from "./shared/ui/Header.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {PostsListPage} from "./features/posts/ui/pages/PostsListPage.tsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PostInfoPage} from "./features/posts/ui/pages/PostInfoPage.tsx";
import {CreatePostPage} from "./features/posts/ui/pages/CreatePostPage.tsx";
import {UpdatePostPage} from "./features/posts/ui/pages/UpdatePostPage.tsx";

const queryClient = new QueryClient();

function App() {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Header/>
                <main className="max-w-4xl mx-auto px-8 py-6">
                    <Routes>
                        <Route path="/" element={<Navigate to="/posts" replace/>}/>
                        <Route path="/posts" element={<PostsListPage/>}/>
                        <Route path="/posts/:id" element={<PostInfoPage/>}/>
                        <Route path="/posts/new" element={<CreatePostPage/>}/>
                        <Route path="/posts/:id/update" element={<UpdatePostPage/>}/>
                    </Routes>
                </main>
            </QueryClientProvider>
        </>
    )
}

export default App
//http://localhost:5173/posts/43/update
//http://localhost:5173/post/43/update