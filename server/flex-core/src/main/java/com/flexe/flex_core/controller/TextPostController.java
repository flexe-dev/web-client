package com.flexe.flex_core.controller;

import com.flexe.flex_core.entity.posts.media.MediaPost;
import com.flexe.flex_core.entity.posts.text.TextPost;
import com.flexe.flex_core.service.posts.MediaPostService;
import com.flexe.flex_core.service.posts.TextPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/post/text")
public class TextPostController {

    @Autowired
    private
    TextPostService service;

    @PostMapping("/upload")
    public TextPost savePost(@RequestBody TextPost post) {
        TextPost content = post;
        return service.savePost(post);
    }

    @GetMapping("/{id}")
    public TextPost getUserPostFromID(@PathVariable String id) {
        return service.getUserTextPostFromID(id);
    }

    @GetMapping("/user/{userId}")
    public TextPost[] getAllPostFromUser(@PathVariable String userId) {
        return service.getAllTextPostFromUser(userId);
    }

}
