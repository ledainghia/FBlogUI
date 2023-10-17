interface Props {
  content: string;
  maxLength: number;
}
export function PostPreview2({ content, maxLength }: Props) {
  if (content.length <= maxLength) {
    return (
      <>
        <span className="excerpt mb-0">{content}</span>
      </>
    );
  }

  const truncatedBody = content.slice(0, maxLength) + "...";
  return <>{truncatedBody}</>;
}
function PostPreview({ content, maxLength }: Props) {
  if (content.length <= maxLength) {
    return (
      <>
        <p className="excerpt mb-0">{content}</p>
      </>
    );
  }

  const truncatedBody = content.slice(0, maxLength) + "...";
  return (
    <>
      <span className="excerpt mb-0">{truncatedBody}</span>
    </>
  );
}

export default PostPreview;
