package com.flexe.flex_core.controller;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flexe.flex_core.entity.posts.UserPost;
import com.flexe.flex_core.service.UserPostService;

@RestController
@RequestMapping("api/post")
public class UserPostController {

    @Autowired
    UserPostService service;

    @PostMapping("/upload")
    public UserPost savePost(@RequestBody UserPost post) {
        UserPost content = post;
        return service.savePost(post);
    }

    @GetMapping("/hi")
    public String hi() {
        return "Hello";
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
