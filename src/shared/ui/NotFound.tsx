import {ReturnLink} from "./ReturnLink.tsx";


export function NotFound() {
    return (
        <div className="text-center flex items-center justify-center flex-col">
            <p className="text-base font-semibold text-indigo-400">404</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                Page not found
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <ReturnLink name={"Return to Posts list"} to={'/posts'} />
            </div>
        </div>
    )
}