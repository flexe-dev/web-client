package com.flexe.flex_core.entity.media;

class MediaContent {
    private String id;
    private String location;
    private PostContentType format;
    private Integer width;
    private Integer height;
    private String alt;
    private Boolean uploaded;

    private enum PostContentType {
        IMAGE,
        VIDEO,
        GIF
    }

}