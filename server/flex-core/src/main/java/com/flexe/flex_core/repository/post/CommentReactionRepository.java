package com.flexe.flex_core.repository.post;

import com.flexe.flex_core.entity.posts.metrics.CommentReact;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface CommentReactionRepository extends MongoRepository<CommentReact, String> {
    @Query("{ 'commentId' : ?0, 'userId' : ?1 }")
    Optional<CommentReact> findByCommentIdAndUserId(String commentId, String userId);
}
