package com.flexe.flex_core.entity.posts.text;

import com.flexe.flex_core.entity.posts.metrics.PostMetrics;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.util.Date;

@Document(collection = "TextPosts")
public class TextPost {
    @Id
    private final String id;

    @Field(targetType = FieldType.OBJECT_ID)
    private String userID;

    private final Date createdAt;
    private Date updatedAt;
    private final String textpost;
    private final PostMetrics metrics;

    public TextPost(String id, String textpost, String userID, Date createdAt, PostMetrics externalData) {
        this.id = id;
        this.textpost = textpost;
        this.userID = userID;
        this.createdAt = createdAt;
        this.metrics = externalData;
    }


    public Date getCreatedAt() {return createdAt;}

    public String getTextpost() {return textpost;}

    public PostMetrics getMetrics() { return metrics;}

    public String getId() {
        return id;
    }

    public String getUserID() {
        return userID;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
