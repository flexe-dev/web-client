package com.flexe.flex_core.service;

import com.flexe.flex_core.entity.media.UserPost;
import com.flexe.flex_core.repository.UserPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserPostService {

    @Autowired
    private
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
