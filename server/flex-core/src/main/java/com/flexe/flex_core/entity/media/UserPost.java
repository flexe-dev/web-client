package com.flexe.flex_core.entity.media;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "MediaPosts")
public class UserPost {
    @Id
    @JsonProperty("id")
    private String id;
    @JsonProperty("auxData")
    private PostAuxData auxData;
    @JsonProperty("externalData")
    private PostExternalData externalData;
    @JsonProperty("document")
    private List<PostContent> document;

    public UserPost() {
    }

    public UserPost(String id, PostAuxData auxData, PostExternalData externalData, List<PostContent> document) {
        this.id = id;
        this.auxData = auxData;
        this.externalData = externalData;
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

    public PostExternalData getExternalData() {
        return externalData;
    }

    public void setExternalData(PostExternalData externalData) {
        this.externalData = externalData;
    }

    public List<PostContent> getDocument() {
        return document;
    }

}