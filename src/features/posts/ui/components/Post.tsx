type PostProps = {
    title: string
    description: string
    content: string
}

export function Post({title,description,content}:PostProps) {
    return (
        <div className="card-dark">
            <div className={"p-10"}>
                <h2 className={"text-white font-bold text-2xl pb-5"}>{title}</h2>
                <p className={"text-slate-200 pb-5"}>{description}</p>
                <p className={"text-slate-400"}>{content} - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias animi assumenda cumque, ducimus earum eligendi esse est eum excepturi exercitationem facilis inventore, ipsum iste laborum libero magnam magni modi nesciunt non nostrum obcaecati officia officiis praesentium quidem quisquam quo repellat repellendus repudiandae saepe tempore vel veniam veritatis voluptas voluptate?</p>
            </div>
        </div>
    )
}