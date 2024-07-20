package com.flexe.flex_core.structures.comments;

import com.flexe.flex_core.entity.posts.metrics.Comment;
import com.flexe.flex_core.entity.user.User;
import com.flexe.flex_core.entity.user.UserAccount;

import java.util.ArrayList;
import java.util.List;

public class CommentNode {
    private Comment comment;
    private UserAccount user;
    private List<CommentNode> children;

    public CommentNode(Comment comment) {
        this.comment = comment;
        this.children = new ArrayList<>();
    }

    public CommentNode(Comment comment, UserAccount user) {
        this.comment = comment;
        this.user = user;
        this.children = new ArrayList<>();
    }

    public void setUser(UserAccount user) {
        this.user = user;
    }

    public UserAccount getUser() {
        return user;
    }

    public void addChild(CommentNode child){
        children.add(child);
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public List<CommentNode> getChildren() {
        return children;
    }

    public void setChildren(List<CommentNode> children) {
        this.children = children;
    }

}

