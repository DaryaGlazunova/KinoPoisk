import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./_comments-list.scss";
import axios from "axios";
import { fetchCommentType, CommentData, SubmitLabels } from "../../types";
import Comment from "./comment-item/comment-item";
import { changeDateFormat } from "../../utils/datetime";
import CommentForm from "./comment-form/comment-form";

const Comments: React.FC = () => {
  const currentUserId = 3;

  const [commentsList, setCommentsList] = React.useState<CommentData[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeCommentId, setActiveComment] = React.useState<number | null>(
    null
  );

  async function getComments() {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/comments?filmId=${id}`
      );
      setCommentsList(data);
    } catch (error) {
      alert("Ошибка при получении комментариев к фильму!");
      navigate("/");
    }
  }
  async function postComment(newComment: fetchCommentType) {
    try {
      await axios.post(`http://localhost:3001/comments`, newComment);
    } catch (error) {
      alert("Ошибка при добавлении нового комментария!");
    }
  }

  async function putComment(
    newParameters: fetchCommentType,
    commentId: number
  ) {
    try {
      await axios.put(
        `http://localhost:3001/comments/${commentId}`,
        newParameters
      );
    } catch (error) {
      alert("Ошибка при изменении комментария!");
    }
  }

  async function deleteCommentFromServer(commentId: number) {
    try {
      await axios.delete(`http://localhost:3001/comments/${commentId}`);
    } catch (error) {
      alert("Ошибка при удалении комментария!");
    }
  }

  const deleteComment = async (commentId: number) => {
    if (window.confirm("Удалить комментарий?")) {
      await deleteCommentFromServer(commentId);
      await getComments();
    }
  };

  const addComment = async (text: string, name: string) => {
    const commentData = {
      filmId: Number(id),
      userId: currentUserId,
      authorName: name,
      authorImage:
        "https://kartinki.pibig.info/uploads/posts/2023-08/1692326759_kartinki-pibig-info-p-kartinka-siluet-litsa-vkontakte-24.png",
      text: text,
      date: changeDateFormat(new Date()),
    };

    await postComment(commentData);

    await getComments();
  };

  const updateComment = async (
    text: string,
    name: string,
    commentId: number
  ) => {
    const newCommentParam = {
      filmId: Number(id),
      userId: currentUserId,
      authorImage:
        "https://kartinki.pibig.info/uploads/posts/2023-08/1692326759_kartinki-pibig-info-p-kartinka-siluet-litsa-vkontakte-24.png",
      authorName: name,
      text: text,
      date: changeDateFormat(new Date()),
    };
    await putComment(newCommentParam, commentId);
    await getComments();
    setActiveComment(null);
  };

  React.useEffect(() => {
    getComments();
  }, []);

  const CommentList = commentsList.map((rootComment) => (
    <Comment
      key={rootComment.id}
      comment={rootComment}
      activeCommentId={activeCommentId}
      setActiveComment={setActiveComment}
      deleteComment={deleteComment}
      updateComment={updateComment}
      currentUserId={currentUserId}
    />
  ));

  return (
    <div>
      <div className="film__comments">
        <h3>Комментарии к фильму</h3>
        {commentsList ? (
          CommentList
        ) : (
          <div>Комментарии к фильму отсутвтуют</div>
        )}
      </div>
      <div className="film__add-comment">
        <CommentForm
          submitLabel={SubmitLabels.SEND}
          handleSubmit={addComment}
        />
      </div>
    </div>
  );
};

export default Comments;
