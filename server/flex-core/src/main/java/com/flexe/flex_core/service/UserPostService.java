package com.flexe.flex_core.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flexe.flex_core.entity.posts.UserPost;
import com.flexe.flex_core.repository.UserPostRepository;

@Service
public class UserPostService {

    @Autowired
    UserPostRepository repository;

    public UserPost savePost(UserPost post) {
        return repository.save(post);
    }

    public UserPost getUserPostFromID(String id) {
        return repository.findById(id).orElse(null);
    }

    public UserPost[] getAllPostFromUser(String userID) {
        return repository.findAll().stream().filter(post -> post.getAuxData().getUserID().equals(userID))
                .toArray(UserPost[]::new);
    }
}
