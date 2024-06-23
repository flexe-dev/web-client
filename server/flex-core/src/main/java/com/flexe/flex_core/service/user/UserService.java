package com.flexe.flex_core.service.user;

import com.flexe.flex_core.entity.posts.media.MediaPost;
import com.flexe.flex_core.entity.posts.text.TextPost;
import com.flexe.flex_core.entity.user.User;
import com.flexe.flex_core.entity.user.UserAccount;
import com.flexe.flex_core.entity.user.UserProfile;
import com.flexe.flex_core.repository.user.UserRepository;
import com.flexe.flex_core.repository.user.UserProfileRepository;
import com.flexe.flex_core.service.posts.MediaPostService;
import com.flexe.flex_core.service.posts.TextPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserProfileRepository userProfileRepository;
    @Autowired
    private MediaPostService mediaPostService;
    @Autowired
    private TextPostService textPostService;
    //User Queries

    public UserAccount findUserAccount(String userId){
        User user = userRepository.findById(userId).orElse(null);
        UserProfile profile = userProfileRepository.findByUserId(userId);
        MediaPost[] mediaPosts = mediaPostService.getAllPostFromUser(userId);
        TextPost[] textPosts = textPostService.getAllTextPostFromUser(userId);
        return new UserAccount(user, profile, mediaPosts, textPosts);
    }

    public UserAccount findUserAccountByUsername(String username){
        User user = userRepository.findByUsername(username).orElse(null);
        if(user == null){
            return null;
        }

        UserProfile profile = userProfileRepository.findByUserId(user.getId());
        MediaPost[] mediaPosts = mediaPostService.getAllPostFromUser(user.getId());
        TextPost[] textPosts = textPostService.getAllTextPostFromUser(user.getId());
        return new UserAccount(user, profile, mediaPosts, textPosts);
    }

    public User findUserById(String userId){
        return userRepository.findById(userId).orElse(null);
    }

    public User findUserByUsername(String username){
        return userRepository.findByUsername(username).orElse(null);
    }

    public User findUserByEmail(String email){
        return userRepository.findByEmail(email).orElse(null);
    }

    public UserProfile findProfile(String userId){
        return userProfileRepository.findByUserId(userId);
    }

    //User Creation

    public UserProfile createProfile(String userId){
        UserProfile profile = new UserProfile(userId);
        return userProfileRepository.save(profile);
    }

    //User Modification

    public User updateUser(User user){
        return userRepository.save(user);
    }

    public UserProfile updateProfile(UserProfile userProfile){
        return userProfileRepository.save(userProfile);
    }

    public UserAccount updateUserAccount(UserAccount account){
        userRepository.save(account.getUser());
        userProfileRepository.save(account.getProfile());
        return account;
    }
}
