package com.flexe.flex_core.controller;

import com.flexe.flex_core.entity.posts.media.MediaPost;
import com.flexe.flex_core.service.posts.MediaPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/post/media")
public class MediaPostController {

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

    @GetMapping("/user/{userId}")
    public MediaPost[] getAllPostFromUser(@PathVariable String userId) {
        return service.getAllPostFromUser(userId);
    }

}
