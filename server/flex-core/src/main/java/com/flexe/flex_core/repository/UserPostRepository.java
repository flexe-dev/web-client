package com.flexe.flex_core.repository;

import com.flexe.flex_core.entity.media.UserPost;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPostRepository extends MongoRepository<UserPost, String> {

}
