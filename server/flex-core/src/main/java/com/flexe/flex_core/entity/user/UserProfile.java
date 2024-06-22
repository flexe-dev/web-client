package com.flexe.flex_core.entity.user;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "UserProfile")
public class UserProfile{
    @Id
    private String id;
    @Field(targetType = FieldType.OBJECT_ID)
    private String userId;
    private String job;
    private Integer followers;
    private Integer following;
    private String company;
    private String location;
    private UserExternalLinks external;
    private String bio;
    private String pronouns;

    public UserProfile() {
    }

    public UserProfile(String userId){
        this.userId = userId;
        this.followers = 0;
        this.following = 0;
    }

    public UserProfile(String id, String userId, String job, Integer followers, Integer following, String company, String location, UserExternalLinks external, String bio, String pronouns, byte[] readMe) {
        this.id = id;
        this.userId = userId;
        this.job = job;
        this.followers = followers;
        this.following = following;
        this.company = company;
        this.location = location;
        this.external = external;
        this.bio = bio;
        this.pronouns = pronouns;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public Integer getFollowers() {
        return followers;
    }

    public void setFollowers(Integer followers) {
        this.followers = followers;
    }

    public Integer getFollowing() {
        return following;
    }

    public void setFollowing(Integer following) {
        this.following = following;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public UserExternalLinks getExternal() {
        return external;
    }

    public void setExternal(UserExternalLinks external) {
        this.external = external;
    }

}