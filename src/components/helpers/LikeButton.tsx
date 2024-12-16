/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { blogDisLike, blogLike } from "../../store/slices/userThunk";
import { Button } from "@nextui-org/react";

interface BlogListingProps {
    blogId: string | undefined;
    like: number | undefined;
    dislike: number | undefined;
}

const LikeButton: React.FC<BlogListingProps> = ({ blogId, like, dislike }) => {
    const dispatch: AppDispatch = useDispatch();

    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(like || 0);
    const [dislikeCount, setDislikeCount] = useState(dislike || 0);

    const handleLike = async () => {
        if (userLiked) return;
        try {
            const response = await dispatch(blogLike(blogId as string)).unwrap();
            setLikeCount(response.result.likes);
            setDislikeCount(response.result.dislikes);
            setUserLiked(true);
            setUserDisliked(false);
        } catch (error: any) {
            console.error(error);
        }
    };

    const handleDislike = async () => {
        if (userDisliked) return;
        try {
            const response = await dispatch(blogDisLike(blogId as string)).unwrap();
            setLikeCount(response.result.likes);
            setDislikeCount(response.result.dislikes);
            setUserLiked(false);
            setUserDisliked(true);
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <div className="flex gap-2">
            <Button
                onClick={handleLike}
                style={{ color: userLiked ? "blue" : "black" }}
            >
                👍 Like {likeCount}
            </Button>
            <Button
                className="mx-3"
                onClick={handleDislike}
                style={{ color: userDisliked ? "red" : "black" }}
            >
                👎 Dislike {dislikeCount}
            </Button>
        </div>
    );
};

export default LikeButton;
