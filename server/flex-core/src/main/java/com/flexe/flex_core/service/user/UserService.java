package com.flexe.flex_core.service.user;

import com.flexe.flex_core.entity.nodes.user.UserNode;
import com.flexe.flex_core.entity.user.User;
import com.flexe.flex_core.entity.user.UserAccount;
import com.flexe.flex_core.entity.user.UserProfile;
import com.flexe.flex_core.repository.user.UserNodeRepository;
import com.flexe.flex_core.repository.user.UserRepository;
import com.flexe.flex_core.repository.user.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserProfileRepository userProfileRepository;
    @Autowired
    private UserNodeRepository userNodeRepository;

    //User Queries

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

    public UserNode findUserNodeById(String userId){
        return userNodeRepository.findById(userId).orElse(null);
    }

    //User Creation

    public UserProfile initialiseUser(String userId){
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()) return null;

        UserProfile profile = new UserProfile(user.get().getId());
        UserNode newUserNode = createUserNode(user.get());

        if(newUserNode == null) return null;
        return userProfileRepository.save(profile);

    }

    public UserNode createUserNode(User user){
        UserNode newNode = new UserNode(user);
        return userNodeRepository.save(newNode);
    }

    //User Modification

    public UserNode updateUserNode(UserNode userNode){
        return userNodeRepository.save(userNode);
    }

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
