package com.flexe.flex_core.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.flexe.flex_core.entity.posts.UserPost;

@Repository
public interface UserPostRepository extends MongoRepository<UserPost, String> {

}
