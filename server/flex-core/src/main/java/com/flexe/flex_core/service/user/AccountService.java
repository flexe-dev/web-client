package com.flexe.flex_core.service.user;

import com.flexe.flex_core.entity.posts.media.MediaPost;
import com.flexe.flex_core.entity.posts.text.TextPost;
import com.flexe.flex_core.entity.user.User;
import com.flexe.flex_core.entity.user.UserAccount;
import com.flexe.flex_core.entity.user.UserProfile;
import com.flexe.flex_core.repository.user.UserProfileRepository;
import com.flexe.flex_core.repository.user.UserRepository;
import com.flexe.flex_core.service.posts.MediaPostService;
import com.flexe.flex_core.service.posts.TextPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private MediaPostService mediaPostService;

    @Autowired
    private TextPostService textPostService;

    public UserAccount findUserAccount(String userId){
        User user = userRepository.findById(userId).orElse(null);

        if(user == null) return null;

        //Consider Multi Threading Collection Calls
        UserProfile profile = userProfileRepository.findByUserId(userId);
        MediaPost[] mediaPosts = mediaPostService.getAllPostFromUser(userId);
        TextPost[] textPosts = textPostService.getAllTextPostFromUser(userId);
        return new UserAccount(user, profile, mediaPosts, textPosts);
    }

    public UserAccount findUserAccountByUsername(String username){
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) return null;

        //Consider Multi Threading Collection Calls
        UserProfile profile = userProfileRepository.findByUserId(user.getId());
        MediaPost[] mediaPosts = mediaPostService.getAllPostFromUser(user.getId());
        TextPost[] textPosts = textPostService.getAllTextPostFromUser(user.getId());
        return new UserAccount(user, profile, mediaPosts, textPosts);
    }

}
