package com.flexe.flex_core.controller;

import com.flexe.flex_core.entity.posts.media.MediaPost;
import com.flexe.flex_core.service.MediaPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/post/media")
public class PostController {

    @Autowired
    private
    MediaPostService service;

    @PostMapping("/upload")
    public MediaPost savePost(@RequestBody MediaPost post) {
        MediaPost content = post;
        return service.savePost(post);
    }

    @GetMapping("/{id}")
    public MediaPost getUserPostFromID(@PathVariable String id) {
        return service.getUserPostFromID(id);
    }

    @GetMapping("/user/{userID}")
    public MediaPost[] getAllPostFromUser(@PathVariable String userID) {
        return service.getAllPostFromUser(userID);
    }

}
