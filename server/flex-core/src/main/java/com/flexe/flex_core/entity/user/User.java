package com.flexe.flex_core.entity.user;

import org.apache.kafka.common.protocol.types.Field;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "User")
public class User{
    @Id
    private String id;
    private String email;
    private Date emailVerified;
    private String username;
    private String name;
    private String image;
    private Boolean onboarded;

    public User() {
    }

    public User(String id, String email, Date emailVerified, String username, String name, String image, Boolean onboarded) {
        this.id = id;
        this.email = email;
        this.emailVerified = emailVerified;
        this.username = username;
        this.name = name;
        this.image = image;
        this.onboarded = onboarded;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Date emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Boolean getOnboarded() {
        return onboarded;
    }

    public void setOnboarded(Boolean onboarded) {
        this.onboarded = onboarded;
    }
}