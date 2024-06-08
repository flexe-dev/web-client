package com.flexe.flex_core.entity.posts;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

public class PostContent {
    @JsonProperty("id")
    private String id;
    @JsonProperty("style")
    private Map<String, Object> style;

    @JsonProperty("options")
    private Map<String, Object> options;

    @JsonProperty("value")
    private Map<String, Object> value;

    @JsonProperty("type")
    private ContentType type;

    public enum ContentType {
        TEXT,
        IMAGE,
        VIDEO,
        CAROUSEL,
    }

}
