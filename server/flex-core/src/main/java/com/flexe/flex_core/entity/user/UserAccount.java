package com.flexe.flex_core.entity.user;

import com.flexe.flex_core.entity.posts.media.MediaPost;
import com.flexe.flex_core.entity.posts.text.TextPost;

import java.util.List;

public class UserAccount {
    public User user;
    public UserProfile profile;
    public MediaPost[] mediaPosts;
    public TextPost[] textPosts;

    public UserAccount(){

    }

    public UserAccount(User user, UserProfile profile, MediaPost[] mediaPosts, TextPost[] textPosts){
        this.user = user;
        this.profile = profile;
        this.mediaPosts = mediaPosts;
        this.textPosts = textPosts;
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

    public TextPost[] getTextPosts() { return textPosts;}

    public void setTextPosts(TextPost[] textPosts) {this.textPosts = textPosts;}
}



