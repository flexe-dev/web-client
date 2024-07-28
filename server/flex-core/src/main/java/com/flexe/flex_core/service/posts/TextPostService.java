package com.flexe.flex_core.service.posts;

import com.flexe.flex_core.entity.nodes.posts.PostMetadata;
import com.flexe.flex_core.entity.nodes.posts.PostNode;
import com.flexe.flex_core.entity.nodes.user.UserNode;
import com.flexe.flex_core.entity.posts.text.TextPost;
import com.flexe.flex_core.entity.relationship.PostCreationRelationship;
import com.flexe.flex_core.repository.post.PostNodeRepository;
import com.flexe.flex_core.repository.post.TextPostRepository;
import com.flexe.flex_core.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class TextPostService {

    @Autowired
    private TextPostRepository repository;

    @Autowired
    private UserService userService;

    @Autowired
    private PostNodeRepository postNodeRepository;

    public TextPost savePost(TextPost textPost) {
        PostNode savedNode = generatePostNode(textPost);
        if(savedNode == null){
            return null;
        }

        return repository.save(textPost);
    }

    public TextPost getUserTextPostFromID(String id) { return repository.findById(id).orElse(null);}

    public TextPost[] getAllTextPostFromUser(String userId) {
        return repository.findAllTextPostByUserId(userId);
    }

public void deletePost(String postId) {

        postNodeRepository.deleteById(postId);
        repository.deleteById(postId);
    }

    public PostNode generatePostNode(TextPost post){
        //Will Generate Metadata based on Post later once infrastructure is set up
        PostNode newNode = new PostNode(post, new ArrayList<String>());

        //Save Node to Database
        PostNode savedNode = postNodeRepository.save(newNode);

        //Link Creator with Post Node
        UserNode userNode = userService.findUserNodeById(post.getUserID());
        if(userNode == null) return null;

        PostCreationRelationship relationship = new PostCreationRelationship(savedNode, post);
        userNode.addPost(relationship);
        userService.updateUserNode(userNode);
        return savedNode;
    }
}
