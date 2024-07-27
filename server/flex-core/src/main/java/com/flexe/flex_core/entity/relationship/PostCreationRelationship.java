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
public class PostCreationRelationship {

    @Id
    @GeneratedValue
    private Long id;

    private Date createdAt;

    @TargetNode
    private PostNode post;

    public PostCreationRelationship(){
    }

    public PostCreationRelationship(PostNode postNode, MediaPost post){
        this.post = postNode;
        this.createdAt = post.getAuxData().getDateCreated();
    }

    public PostCreationRelationship(PostNode postNode, TextPost post){
        this.post = postNode;
        this.createdAt = post.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public PostNode getPost() {
        return post;
    }

    public void setPost(PostNode post) {
        this.post = post;
    }
}
