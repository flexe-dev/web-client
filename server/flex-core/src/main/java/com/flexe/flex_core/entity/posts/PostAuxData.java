package com.flexe.flex_core.entity.posts;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class PostAuxData {
    @JsonProperty("userID")
    private String userID;
    @JsonProperty("postStatus")
    private UserPostStatus postStatus;
    @JsonProperty("title")
    private String title;
    @JsonProperty("tags")
    private List<String> tags;
    @JsonProperty("tech")
    private List<String> tech;
    @JsonProperty("thumbnail")
    private String thumbnail;

    public enum UserPostStatus {
        DRAFT,
        PUBLISHED,
        ARCHIVED
    }

    public PostAuxData() {
    }

    public PostAuxData(String userID, UserPostStatus status, String title, List<String> tags,
            List<String> tech, String thumbnail) {
        this.userID = userID;
        this.postStatus = status;
        this.title = title;
        this.tags = tags;
        this.tech = tech;
        this.thumbnail = thumbnail;
    }

    public String getUserID() {
        return userID;
    }

}
