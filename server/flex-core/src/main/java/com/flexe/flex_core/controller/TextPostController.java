package com.flexe.flex_core.controller;

import com.flexe.flex_core.entity.nodes.posts.PostNode;
import com.flexe.flex_core.entity.posts.media.MediaPost;
import com.flexe.flex_core.entity.posts.text.TextPost;
import com.flexe.flex_core.service.posts.MediaPostService;
import com.flexe.flex_core.service.posts.PostCommentService;
import com.flexe.flex_core.service.posts.TextPostService;
import io.sentry.Sentry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/post/text")
public class TextPostController {

    @Autowired
    private
    TextPostService service;

    @Autowired
    private PostCommentService commentService;

    @PostMapping("/upload")
    public ResponseEntity<TextPost> savePost(@RequestBody TextPost post) {
        try{
            TextPost savedPost = service.savePost(post);
            if(savedPost == null){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to save post");
            }
            return ResponseEntity.ok(savedPost);
        }
        catch (Exception e){
            Sentry.captureException(e);
            return null;
        }
    }

    @PostMapping("/node/create")
    @ResponseBody
    public ResponseEntity<PostNode> generatePostNode(@RequestBody TextPost post){
        try{
            PostNode savedNode = service.generatePostNode(post);
            if(savedNode == null){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Node not saved");
            }
            return ResponseEntity.ok(savedNode);
        }
        catch (Exception e){
            Sentry.captureException(e);
            return null;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TextPost> getUserPostFromID(@PathVariable String id) {
        TextPost post = service.getUserTextPostFromID(id);
        if(post == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found");
        }
        return ResponseEntity.ok(post);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<TextPost[]> getAllPostFromUser(@PathVariable String userId) {
        TextPost[] userTextPosts = service.getAllTextPostFromUser(userId);
        if(userTextPosts == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Posts not found");
        }
        return ResponseEntity.ok(userTextPosts);
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable String postId) {
        try{
            service.deletePost(postId);
            commentService.deletePostComments(postId);
            return ResponseEntity.ok("Post deleted");
        }
        catch (Exception e){
            Sentry.captureException(e);
            return null;
        }
    }
}
