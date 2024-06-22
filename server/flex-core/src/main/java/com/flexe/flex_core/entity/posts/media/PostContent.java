package com.flexe.flex_core.entity.posts.media;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

public class PostContent {
    private String id;
    private Map<String, Object> style;

    private Map<String, Object> options;

    private Map<String, Object> value;

    private ContentType type;

    public enum ContentType {
        TEXT,
        IMAGE,
        VIDEO,
        CAROUSEL,
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Map<String, Object> getStyle() {
        return style;
    }

    public void setStyle(Map<String, Object> style) {
        this.style = style;
    }

    public Map<String, Object> getOptions() {
        return options;
    }

    public void setOptions(Map<String, Object> options) {
        this.options = options;
    }

    public Map<String, Object> getValue() {
        return value;
    }

    public void setValue(Map<String, Object> value) {
        this.value = value;
    }

    public ContentType getType() {
        return type;
    }

    public void setType(ContentType type) {
        this.type = type;
    }
}
