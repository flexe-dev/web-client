package com.flexe.flex_core.controller;

import com.flexe.flex_core.entity.posts.metrics.Comment;
import com.flexe.flex_core.service.posts.PostCommentService;
import com.flexe.flex_core.structures.comments.CommentNode;
import io.sentry.Sentry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/post/comment")
public class CommentController {
    @Autowired
    private PostCommentService service;

    @GetMapping("/get/post/{postId}")
    public ResponseEntity<CommentNode[]> getPostComments(@PathVariable String postId) {
        return ResponseEntity.ok(service.getPostComments(postId));
    }

    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment) {
        try{
            Comment addedComment = service.saveComment(comment);
            if(addedComment == null){
                throw new ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Comment not added");
            }
            return ResponseEntity.ok(addedComment);
        }
        catch (Exception e){
            Sentry.captureException(e);
           return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/delete/comment")
    public ResponseEntity<String> deleteCommentById(@RequestBody CommentNode comment) {
        try{
            service.deleteComment(comment);
            return ResponseEntity.ok("Comment deleted");
        }
        catch (Exception e){
            Sentry.captureException(e);
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/delete/post/{postId}")
    public ResponseEntity<String> deleteAllPostComments(@PathVariable String postId){
        try{
            service.deletePostComments(postId);
            return ResponseEntity.ok("Comments deleted");
        }
        catch (Exception e){
            Sentry.captureException(e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/edit")
    @ResponseBody
    public ResponseEntity<Comment> editComment(@RequestBody Comment comment) {
        try{
            comment.setDateUpdated(new Date());
            Comment savedComment = service.saveComment(comment);
            if(savedComment == null){
                throw new ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Comment not saved");
            }
            return ResponseEntity.ok(savedComment);
        }
        catch (Exception e){
            Sentry.captureException(e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/like/{commentId}/{userId}")
    public ResponseEntity<String> likeComment(@PathVariable String commentId, @PathVariable String userId) {
        try{
            service.likeComment(commentId, userId);
            return ResponseEntity.ok("Comment liked");
        }
        catch (Exception e){
            Sentry.captureException(e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/dislike/{commentId}/{userId}")
    public ResponseEntity<String> dislikeComment(@PathVariable String commentId, @PathVariable String userId){
        try{
            service.dislikeComment(commentId, userId);
            return ResponseEntity.ok("Comment disliked");
        }
        catch (Exception e){
            Sentry.captureException(e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/react/remove/{commentId}/{userId}")
    public ResponseEntity<String> removeCommentReaction(@PathVariable String commentId, @PathVariable String userId){
        try{
            service.removeReaction(commentId, userId);
            return ResponseEntity.ok("Comment reaction removed");
        }
        catch (Exception e){
            Sentry.captureException(e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/report/{commentId}")
    public ResponseEntity<String> reportComment(@PathVariable String commentId){
        try{
            service.reportComment(commentId);
            return ResponseEntity.ok("Comment reported");
        }
        catch (Exception e){
            Sentry.captureException(e);
            return ResponseEntity.badRequest().build();
        }
    }



}
