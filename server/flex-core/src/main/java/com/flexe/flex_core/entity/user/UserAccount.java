package com.flexe.flex_core.entity.user;

import com.flexe.flex_core.entity.posts.media.MediaPost;

import java.util.List;

public class UserAccount {
    public User user;
    public UserProfile profile;
    public MediaPost[] mediaPosts;

    public UserAccount(){

    }

    public UserAccount(User user, UserProfile profile, MediaPost[] mediaPosts){
        this.user = user;
        this.profile = profile;
        this.mediaPosts = mediaPosts;
    };

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserProfile getProfile() {
        return profile;
    }

    public void setProfile(UserProfile profile) {
        this.profile = profile;
    }

    public MediaPost[] getMediaPosts() {
        return mediaPosts;
    }

    public void setMediaPosts(MediaPost[] mediaPosts) {
        this.mediaPosts = mediaPosts;
    }
}



