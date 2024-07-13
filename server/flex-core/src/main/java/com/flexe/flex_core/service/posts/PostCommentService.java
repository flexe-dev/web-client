package com.flexe.flex_core.service.posts;

import com.flexe.flex_core.entity.posts.metrics.Comment;
import com.flexe.flex_core.entity.posts.metrics.CommentReact;
import com.flexe.flex_core.entity.user.User;
import com.flexe.flex_core.entity.user.UserAccount;
import com.flexe.flex_core.repository.post.CommentReactionRepository;
import com.flexe.flex_core.repository.post.PostCommentRepository;
import com.flexe.flex_core.service.user.UserService;
import com.flexe.flex_core.structures.comments.CommentNode;
import org.bson.types.ObjectId;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PostCommentService {

    @Autowired
    private PostCommentRepository repository;
    @Autowired
    private CommentReactionRepository reactionRepository;
    @Autowired
    private UserService userService;

    public CommentNode[] getPostComments(String postId) {
        Comment[] comments = repository.findAllByPostId(postId);
        return generateCommentTree(comments);
    }

    private CommentNode[] generateCommentTree(@NotNull Comment[] comments){

        Map<String, List<Comment>> commentMap = new HashMap<>();
        for(Comment comment: comments){
            commentMap.computeIfAbsent(comment.getParentId(), k -> new ArrayList<>()).add(comment);
        }
        Map<String, CommentNode> commentNodeMap = new HashMap<>();
        Map<String, UserAccount> userCommentMap = new HashMap<>();
        for(Comment comment: comments){
            CommentNode node = new CommentNode(comment);
            if(!userCommentMap.containsKey(comment.getUserId())){
                UserAccount user = userService.findUserAccount(comment.getUserId());
                userCommentMap.put(comment.getUserId(), user);
            }
            node.setUser(userCommentMap.get(comment.getUserId()));
            commentNodeMap.put(comment.getId(), node);
        }

        List<CommentNode> commentTree = new ArrayList<>();
        for(Comment comment: comments){
            if(comment.getParentId() == null || !commentMap.containsKey(comment.getParentId())){
                commentTree.add(commentNodeMap.get(comment.getId()));
            }
            else{
            CommentNode parent = commentNodeMap.get(comment.getParentId());
            parent.addChild(commentNodeMap.get(comment.getId()));
            }

        }

        return commentTree.toArray(new CommentNode[0]);
    }

    public Comment saveComment(Comment comment){
        if(comment.getId().isEmpty()){
           comment.setId(new ObjectId().toHexString());
        }
        return repository.save(comment);
    }

    public void deletePostComments(String postId){
        repository.deleteAllByPostId(postId);
    }

    public void deleteComment(CommentNode comment){
        List<String> commentIds = new ArrayList<>();
        traverseCommentNode(comment, commentIds);
        repository.deleteAllById(commentIds);
    }

    public void traverseCommentNode(CommentNode current, List<String> children){
        children.add(current.getComment().getId());
        for(CommentNode child: current.getChildren()){
            traverseCommentNode(child, children);
        }
    }

    public Optional<CommentReact> retrieveReaction(String commentId, String userId){
        return reactionRepository.findByCommentIdAndUserId(commentId, userId);
    }

    public void likeComment(String commentId, String userId){
        Optional<Comment> comment = repository.findById(commentId);
        if(comment.isEmpty()) return;

        Optional<CommentReact> reaction = retrieveReaction(commentId, userId);
        
    }

    public void removeReaction(String commentId, String userId){

    }

    public void dislikeComment(String commentId, String userId) {
        Optional<Comment> comment = repository.findById(commentId);
        if(comment.isEmpty()) return;

        CommentReact react = new CommentReact(CommentReact.ReactType.DISLIKE, commentId, userId);
        reactionRepository.save(react);
        Comment c = comment.get();
        c.setDislikes(c.getDislikes() + 1);
        repository.save(c);
    }

    public void reportComment(String commentId) {
        //Add To Seperate Table for Reported Comments
    }

}
