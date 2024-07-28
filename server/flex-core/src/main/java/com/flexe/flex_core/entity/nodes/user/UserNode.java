package com.flexe.flex_core.entity.nodes.user;

import com.flexe.flex_core.entity.nodes.posts.PostNode;
import com.flexe.flex_core.entity.relationship.PostCreationRelationship;
import com.flexe.flex_core.entity.user.User;
import org.springframework.data.neo4j.core.schema.*;

import java.util.HashSet;


@Node("User")
public class UserNode {
    @Id
    private String userId;
    private String name;
    private String username;
    private Integer followCount;
    private Integer followingCount;
    private Integer postCount;

    @Relationship(type = "POSTED", direction = Relationship.Direction.OUTGOING)
    private HashSet<PostCreationRelationship> userPosts = new HashSet<>();

    @Relationship(type = "FOLLOWING", direction = Relationship.Direction.OUTGOING)
    private HashSet<UserNode> following = new HashSet<>();

    @Relationship(type = "FOLLOWED_BY", direction = Relationship.Direction.INCOMING)
    private HashSet<UserNode> followers = new HashSet<>();

    @Relationship(type = "LIKED", direction = Relationship.Direction.OUTGOING)
    private HashSet<PostNode> likedPosts = new HashSet<>();

    @Relationship(type = "SAVED", direction = Relationship.Direction.OUTGOING)
    private HashSet<PostNode> savedPosts = new HashSet<>();

    @Relationship(type = "SHARED", direction = Relationship.Direction.OUTGOING)
    private HashSet<PostNode> sharedPosts = new HashSet<>();

//    @Relationship(type = "COMMENTED", direction = Relationship.Direction.OUTGOING)
//    private HashSet<PostNode> commentedPosts = new HashSet<>();

    //Constructors

    public UserNode(){
    }

    //Default Constructor
    public UserNode(User user){
        this.userId = user.getId();
        this.name = user.getName();
        this.username = user.getUsername();
        this.followCount = 0;
        this.followingCount = 0;
        this.postCount = 0;
    }

    //Node Relationships

    public void deletePost (PostCreationRelationship post) {
        userPosts.remove(post);
    }

    public void addPost (PostCreationRelationship post) {
        userPosts.add(post);
    }

    public void follow (UserNode user) {
        following.add(user);
        user.followers.add(this);
    }

    public void unfollow (UserNode user) {
        following.remove(user);
        user.followers.remove(this);
    }

    public void likePost (PostNode post) {
        likedPosts.add(post);
    }

    public void unlikePost (PostNode post) {
        likedPosts.remove(post);
    }

    public void savePost (PostNode post) {
        savedPosts.add(post);
    }

    public void unsavePost (PostNode post) {
        savedPosts.remove(post);
    }
    public void sharePost (PostNode post) {
        sharedPosts.add(post);
    }

    public void unsharePost (PostNode post) {
        sharedPosts.remove(post);
    }


    //Getters and Setters

    public String getName() {
        return name;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getFollowCount() {
        return followCount;
    }

    public void setFollowCount(Integer followCount) {
        this.followCount = followCount;
    }

    public Integer getFollowingCount() {
        return followingCount;
    }

    public void setFollowingCount(Integer followingCount) {
        this.followingCount = followingCount;
    }

    public Integer getPostCount() {
        return postCount;
    }

    public void setPostCount(Integer postCount) {
        this.postCount = postCount;
    }

    public HashSet<PostCreationRelationship> getUserPosts() {
        return userPosts;
    }

    public void setUserPosts(HashSet<PostCreationRelationship> userPosts) {
        this.userPosts = userPosts;
    }

    public HashSet<UserNode> getFollowing() {
        return following;
    }

    public HashSet<UserNode> getFollowers() {
        return followers;
    }

    public HashSet<PostNode> getLikedPosts() {
        return likedPosts;
    }

    public HashSet<PostNode> getSavedPosts() {
        return savedPosts;
    }


    public HashSet<PostNode> getSharedPosts() {
        return sharedPosts;
    }


//    public HashSet<PostNode> getCommentedPosts() {
//        return commentedPosts;
//    }
//
//    public void commentOnPost (PostNode post) {
//        commentedPosts.add(post);
//    }
//
//    public void deleteCommentOnPost (PostNode post) {
//        commentedPosts.remove(post);
//    }










}
