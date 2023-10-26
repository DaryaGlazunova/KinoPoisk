import React from "react";
import "./_comment-form.scss";
import { SubmitLabels } from "../../../types";

interface AddCommentProps {
  handleSubmit: (text: string, name: string) => void;
  handleCancel?: () => void;
  submitLabel: SubmitLabels;
  hasCancelButton?: boolean;
  initialText?: string;
  initialName?: string;
}

const CommentForm: React.FC<AddCommentProps> = ({
  handleSubmit,
  submitLabel,
  handleCancel,
  hasCancelButton,
  initialText = "",
  initialName = "",
}) => {
  const [author, setAuthor] = React.useState(initialName);
  const [text, setText] = React.useState(initialText);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit(text, author);
    setText("");
    setAuthor("");
  };

  return (
    <form className="comment-form" onSubmit={onSubmit}>
      <input
        className="comment-form__name"
        type="text"
        placeholder="Ваше имя"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
      />
      <textarea
        className="comment-form__text"
        rows={5}
        placeholder="Ваш комментарий..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      ></textarea>
      <div className="comment-form__buttons">
        <button className="comment-form__button comment-form__button_write">
          {submitLabel}
        </button>
        {hasCancelButton && (
          <button
            type="button"
            className="comment-form__button comment-form__button_cancel"
            onClick={handleCancel}
          >
            {" "}
            {SubmitLabels.CANCEL}{" "}
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
