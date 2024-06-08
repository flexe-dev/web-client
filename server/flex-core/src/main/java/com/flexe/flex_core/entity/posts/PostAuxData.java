package com.flexe.flex_core.entity.posts;

import java.util.List;

public class PostAuxData {
    private String id;
    private String userID;
    private UserPostStatus status;
    private String title;
    private List<String> tags;
    private List<String> tech;
    private String thumbnail;

    public enum UserPostStatus {
        DRAFT,
        PUBLISHED,
        ARCHIVED
    }

    public PostAuxData() {
    }

    public PostAuxData(String id, String userID, UserPostStatus status, String title, List<String> tags,
            List<String> tech, String thumbnail) {
        this.id = id;
        this.userID = userID;
        this.status = status;
        this.title = title;
        this.tags = tags;
        this.tech = tech;
        this.thumbnail = thumbnail;
    }

    public String getId() {
        return id;
    }

    public String getUserID() {
        return userID;
    }

}
