import {Link} from "react-router-dom";

type Props = {
    name: string,
    to: string,
}

export function ReturnLink({name,to}:Props) {
    return (
        <Link
            to={to}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors self-end"
        >
            {name}
        </Link>
    )
}