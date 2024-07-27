package com.flexe.flex_core.entity.relationship;

import com.flexe.flex_core.entity.nodes.posts.PostNode;
import com.flexe.flex_core.entity.posts.media.MediaPost;
import com.flexe.flex_core.entity.posts.text.TextPost;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import java.util.Date;

@RelationshipProperties
public class PostReactRelationship {

    @Id
    @GeneratedValue
    private Long id;

    private Date timestamp;
    private ReactType reactType;

    @TargetNode
    private PostNode post;

    public enum ReactType{
        LIKE,
        DISLIKE,
        HAPPY,
        FUNNY,
        SAD
    }

    public PostReactRelationship(){

    }

    public PostReactRelationship(PostNode node, MediaPost post, ReactType reactType){
        this.post = node;
        this.timestamp = post.getAuxData().getDateCreated();
        this.reactType = reactType;
    }

    public PostReactRelationship(PostNode node, TextPost post, ReactType reactType){
        this.post = node;
        this.timestamp = post.getCreatedAt();
        this.reactType = reactType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public ReactType getReactType() {
        return reactType;
    }

    public void setReactType(ReactType reactType) {
        this.reactType = reactType;
    }

    public PostNode getPost() {
        return post;
    }

    public void setPost(PostNode post) {
        this.post = post;
    }
}
