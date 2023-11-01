import React from "react";
import { CommentData, SubmitLabels } from "../../../types/comment";
import "./_comment-item.scss";
import CommentForm from "../comment-form/comment-form";

interface CommentProps {
  comment: CommentData;
  setActiveComment: (id: number | null) => void;
  activeCommentId: number | null;
  updateComment: (text: string, name: string, commentId: number) => void;
  deleteComment: (commentId: number) => void;
  currentUserId: number;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  currentUserId,
  setActiveComment,
  updateComment,
  deleteComment,
  activeCommentId,
}) => {
  const isEditing = activeCommentId === comment.id && activeCommentId;
  const canEdit = currentUserId === comment.userId;
  const canDelete = currentUserId === comment.userId;

  return (
    <div className="comment">
      <div className="comment__image">
        <img src={comment.authorImage} alt="" />
      </div>

      <div className="comment__info">
        {!isEditing && (
          <div>
            <h4>{comment.authorName}</h4>
            <p>{comment.text}</p>
          </div>
        )}
        {isEditing && (
          <CommentForm
            submitLabel={SubmitLabels.EDIT}
            hasCancelButton
            initialText={comment.text}
            initialName={comment.authorName}
            handleSubmit={(text: string, name: string) =>
              updateComment(text, name, comment.id)
            }
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <span>{comment.date}</span>
        <div className="comment__buttons">
          {canEdit ? (
            <button
              className="comment__edit-button"
              onClick={() => setActiveComment(comment.id)}
            >
              Edit
            </button>
          ) : null}
          {canDelete ? (
            <button
              className="comment__delete-button"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Comment;
