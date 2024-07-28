package com.flexe.flex_core.entity.posts.media;

import com.flexe.flex_core.entity.posts.metrics.PostMetrics;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "MediaPosts")
public class MediaPost {
    @Id
    private String id;
    private PostAuxData auxData;
    private PostMetrics metrics;
    private List<PostContent> document;

    public MediaPost() {
    }

    public MediaPost(String id, PostAuxData auxData, PostMetrics metrics, List<PostContent> document) {
        this.id = id;
        this.auxData = auxData;
        this.metrics = metrics;
        this.document = document;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public PostAuxData getAuxData() {
        return auxData;
    }

    public void setAuxData(PostAuxData auxData) {
        this.auxData = auxData;
    }

    public PostMetrics getMetrics() {
        return metrics;
    }

    public void setMetrics(PostMetrics metrics) {
        this.metrics = metrics;
    }

    public List<PostContent> getDocument() {
        return document;
    }

}