package com.flexe.flex_core.repository.post;

import com.flexe.flex_core.entity.posts.media.MediaPost;
import com.flexe.flex_core.entity.posts.text.TextPost;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TextPostRepository extends MongoRepository<TextPost, String> {
    @Query("{ 'userID' : ObjectId(?0) }")
    TextPost[] findAllTextPostByUserId(String userId);
}
