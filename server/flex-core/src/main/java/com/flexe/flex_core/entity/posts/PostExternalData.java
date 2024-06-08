package com.flexe.flex_core.entity.posts;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PostExternalData {
    @JsonProperty("likeCount")
    private Integer likeCount;

    @JsonProperty("commentCount")
    private Integer commentCount;

    @JsonProperty("viewCount")
    private Integer viewCount;
}
