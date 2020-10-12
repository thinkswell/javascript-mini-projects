export default function Comment(comment) {

  const hasNestedComments = comment.comments.length > 0;

  return `
    <div class="nested-comments-${comment.level}">
      <p class="comment-header">
        ${comment.user} | ${comment.time_ago}
      </p>
      ${comment.content}
      ${hasNestedComments ? comment.comments.map(comment => Comment(comment)).join('') : ''}
    </div>
  `
}