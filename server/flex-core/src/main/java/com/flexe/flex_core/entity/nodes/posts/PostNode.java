package com.flexe.flex_core.entity.nodes.posts;

import com.flexe.flex_core.entity.posts.media.MediaPost;
import com.flexe.flex_core.entity.posts.metrics.PostMetrics;
import com.flexe.flex_core.entity.posts.text.TextPost;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Node("Post")
public class PostNode {
    //Identifiers
    @Id
    private String postId;
    private PostType type;

    //Metadata
    private List<String> tags;
    private List<String> tech;
    private List<String> keywords;

    //Metrics
    private Integer likeCount;
    private Integer commentCount;
    private Integer viewCount;
    private Integer saveCount;

    public enum PostType{
        TEXT,
        MEDIA
    }

    public PostNode(){

    }

    public PostNode(MediaPost post, List<String> keywords){
        this.postId = post.getId();
        this.type = PostType.MEDIA;
        this.tags = post.getAuxData().getTags();
        this.tech = post.getAuxData().getTech();
        this.keywords = keywords;
        this.likeCount = post.getMetrics().getLikeCount();
        this.commentCount = post.getMetrics().getCommentCount();
        this.viewCount = post.getMetrics().getViewCount();
        this.saveCount = post.getMetrics().getSaveCount();
    }

    public PostNode(TextPost post, List<String> keywords){
        this.postId = post.getId();
        this.type = PostType.TEXT;
        this.tags = new ArrayList<>();
        this.tech = new ArrayList<>();
        this.keywords = keywords;
        this.likeCount = post.getMetrics().getLikeCount();
        this.commentCount = post.getMetrics().getCommentCount();
        this.viewCount = post.getMetrics().getViewCount();
        this.saveCount = post.getMetrics().getSaveCount();
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public PostType getType() {
        return type;
    }

    public void setType(PostType type) {
        this.type = type;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public List<String> getTech() {
        return tech;
    }

    public void setTech(List<String> tech) {
        this.tech = tech;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public Integer getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
    }

    public Integer getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(Integer commentCount) {
        this.commentCount = commentCount;
    }

    public Integer getViewCount() {
        return viewCount;
    }

    public void setViewCount(Integer viewCount) {
        this.viewCount = viewCount;
    }

    public Integer getSaveCount() {
        return saveCount;
    }

    public void setSaveCount(Integer saveCount) {
        this.saveCount = saveCount;
    }
}

