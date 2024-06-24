package com.flexe.flex_core.entity.posts.media;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;


import java.util.Date;
import java.util.List;

public class PostAuxData {
    @Field(targetType = FieldType.OBJECT_ID)
    private String userID;
    private UserPostStatus postStatus;
    private String title;
    private Date dateCreated;
    private Date dateUpdated;
    private List<String> tags;
    private List<String> tech;
    private String thumbnail;

    public PostAuxData() {
    }

    public PostAuxData(String userID, UserPostStatus status, String title, List<String> tags,
                       List<String> tech, String thumbnail) {
        this.userID = userID;
        postStatus = status;
        this.title = title;
        this.tags = tags;
        this.tech = tech;
        this.thumbnail = thumbnail;
    }
    public enum UserPostStatus {
        DRAFT,
        PUBLISHED,
        ARCHIVED
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public UserPostStatus getPostStatus() {
        return postStatus;
    }

    public void setPostStatus(UserPostStatus postStatus) {
        this.postStatus = postStatus;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getDateUpdated() {
        return dateUpdated;
    }

    public void setDateUpdated(Date dateUpdated) {
        this.dateUpdated = dateUpdated;
    }
}
