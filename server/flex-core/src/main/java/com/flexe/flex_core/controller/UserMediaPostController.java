package com.flexe.flex_core.controller;

import com.flexe.flex_core.entity.media.UserPost;
import com.flexe.flex_core.service.UserPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/post/media")
@CrossOrigin(origins = "http://localhost:3000")
public class UserMediaPostController {

    @Autowired
    private
    UserPostService service;

    @PostMapping("/upload")
    public UserPost savePost(@RequestBody UserPost post) {
        UserPost content = post;
        return service.savePost(post);
    }

    @GetMapping("/{id}")
    public UserPost getUserPostFromID(@PathVariable String id) {
        return service.getUserPostFromID(id);
    }

    @GetMapping("/user/{userID}")
    public UserPost[] getAllPostFromUser(@PathVariable String userID) {
        return service.getAllPostFromUser(userID);
    }

}