package com.flexe.flex_core.entity.posts;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.PROPERTY, property = "@class")
@JsonSubTypes({
                @JsonSubTypes.Type(value = String.class, name = "string"),
                @JsonSubTypes.Type(value = PostUserMedia.class, name = "postUserMedia"),
                @JsonSubTypes.Type(value = PostUserMedia[].class, name = "postUserMediaArray")
})
public class ContentValue {
        private Object value;
}
