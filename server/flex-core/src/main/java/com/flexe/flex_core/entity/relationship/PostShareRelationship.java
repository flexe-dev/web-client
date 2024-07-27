package com.flexe.flex_core.entity.relationship;

import com.flexe.flex_core.entity.nodes.posts.PostNode;
import com.flexe.flex_core.entity.user.User;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.TargetNode;

import java.util.Date;

public class PostShareRelationship {

    @Id
    @GeneratedValue
    private Long id;

    private Date timeStamp;
    private String receiverUserId;

    @TargetNode
    private PostNode post;

    public PostShareRelationship(){

    }

    public PostShareRelationship(PostNode node, User user){
        this.post = node;
        this.receiverUserId = user.getId();
        this.timeStamp = new Date();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Date timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getReceiverUserId() {
        return receiverUserId;
    }

    public void setReceiverUserId(String receiverUserId) {
        this.receiverUserId = receiverUserId;
    }

    public PostNode getPost() {
        return post;
    }

    public void setPost(PostNode post) {
        this.post = post;
    }
}
