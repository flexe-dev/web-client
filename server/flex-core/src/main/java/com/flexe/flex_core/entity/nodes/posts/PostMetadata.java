package com.flexe.flex_core.entity.nodes.posts;

import java.util.ArrayList;
import java.util.List;

public class PostMetadata {
    private List<String> tags;
    private List<String> tech;
    private List<String> keywords;

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public List<String> getTech() {
        return tech;
    }

    public void setTech(List<String> tech) {
        this.tech = tech;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public PostMetadata(){
        this.tags = new ArrayList<>();
        this.tech = new ArrayList<>();
        this.keywords = new ArrayList<>();
    }

    public PostMetadata(List<String> tags, List<String> tech, List<String> keywords) {
        this.tags = tags;
        this.tech = tech;
        this.keywords = keywords;
    }

}
