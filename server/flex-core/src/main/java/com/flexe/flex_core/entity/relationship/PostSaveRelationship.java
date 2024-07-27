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
public class PostSaveRelationship {
    @Id
    @GeneratedValue
    private Long id;

    private Date timestamp;
    @TargetNode
    private PostNode post;

    public PostSaveRelationship(){}

    public PostSaveRelationship(PostNode node, MediaPost post){
        this.post = node;
        this.timestamp = new Date();
    }

    public PostSaveRelationship(PostNode node, TextPost post){
        this.post = node;
        this.timestamp = new Date();
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

    public PostNode getPost() {
        return post;
    }

    public void setPost(PostNode post) {
        this.post = post;
    }
}
