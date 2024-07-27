package com.flexe.flex_core.service.posts;

import com.flexe.flex_core.entity.nodes.posts.PostMetadata;
import com.flexe.flex_core.entity.nodes.posts.PostNode;
import com.flexe.flex_core.entity.nodes.user.UserNode;
import com.flexe.flex_core.entity.posts.media.MediaPost;
import com.flexe.flex_core.repository.post.MediaPostRepository;
import com.flexe.flex_core.repository.post.PostNodeRepository;
import com.flexe.flex_core.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.ArrayList;

@Service
public class MediaPostService {

    @Autowired
    private
    MediaPostRepository repository;

    @Autowired
    private PostNodeRepository postNodeRepository;

    @Autowired
    private UserService userService;

    public MediaPost savePost(MediaPost post) {
        PostNode savedNode = generatePostNode(post);
        if(savedNode == null){
            return null;
        }

        return repository.save(post);
    }

    public MediaPost getUserPostFromID(String id) {
        return repository.findById(id).orElse(null);
    }

    public MediaPost[] getAllPostFromUser(String userId) {
        return repository.findAllPostByUserId(userId);
    }

    public void deletePost(String postId) {
        repository.deleteById(postId);
    }

    public PostNode findPostNode(String postId){
        return postNodeRepository.findById(postId).orElse(null);
    }

    public PostNode generatePostNode(MediaPost post){
        //Will Generate Metadata based on Post later once infrastructure is set up
        PostNode newNode = new PostNode(post.getId(), PostNode.PostType.MEDIA, post.getAuxData().getDateCreated());

        //Save Post to Database
        PostNode savedNode = postNodeRepository.save(newNode);
        if(savedNode == null){
            return null;
        }

        //Create a relationship between Poster and Post
        UserNode userNode = userService.findUserNodeById(post.getAuxData().getUserID());
        if(userNode == null){
            return null;
        }

        userNode.addPost(savedNode);
        userService.updateUserNode(userNode);
        return savedNode;
    }
}
