package com.flexe.flex_core.entity.posts;

public class PostContent {
    private String id;
    private Object style;
    private Object options;
    private ContentValue value;

    public enum ContentType {
        TEXT,
        IMAGE,
        VIDEO,
        CAROUSEL,
    }

}
