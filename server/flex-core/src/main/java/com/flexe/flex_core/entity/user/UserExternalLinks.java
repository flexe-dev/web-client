package com.flexe.flex_core.entity.user;

public class UserExternalLinks{
    private String facebook;
    private String twitter;
    private String linkedin;
    private String github;
    private String website;

    public UserExternalLinks() {
    }

    public UserExternalLinks(String facebook, String twitter, String linkedin, String github, String website) {
        this.facebook = facebook;
        this.twitter = twitter;
        this.linkedin = linkedin;
        this.github = github;
        this.website = website;
    }

    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getTwitter() {
        return twitter;
    }

    public void setTwitter(String twitter) {
        this.twitter = twitter;
    }

    public String getLinkedin() {
        return linkedin;
    }

    public void setLinkedin(String linkedin) {
        this.linkedin = linkedin;
    }

    public String getGithub() {
        return github;
    }

    public void setGithub(String github) {
        this.github = github;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }
}