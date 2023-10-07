

interface Props {
    content: string;
    maxLength: number;
}

function PostPreview({ content, maxLength }: Props) {

    if (content.length <= maxLength) {
        return <p className="excerpt mb-0">{content}</p>;
    }


    const truncatedBody = content.slice(0, maxLength) + '...';
    return (
        <p className="excerpt mb-0">
            {truncatedBody}
        </p>
    );
}

export default PostPreview;