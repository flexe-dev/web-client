package com.flexe.flex_core.repository.post;

import com.flexe.flex_core.entity.posts.media.MediaPost;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MediaPostRepository extends MongoRepository<MediaPost, String> {
    @Query("{ 'auxData.userID' : ObjectId(?0) }")
    MediaPost[] findAllPostByUserId(String userId);
}
