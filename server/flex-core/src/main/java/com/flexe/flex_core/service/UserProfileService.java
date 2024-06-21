package com.flexe.flex_core.service;import com.flexe.flex_core.entity.user.User;
import com.flexe.flex_core.entity.user.UserProfile;
import com.flexe.flex_core.repository.user.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository repository;

    public UserProfile createProfile(String userId){
        UserProfile profile = new UserProfile();
        profile.setUserId(userId);
        return repository.save(profile);
    }

    public UserProfile findProfile(String userId){
        return repository.findByUserId(userId);
    }

    public UserProfile updateProfile(UserProfile userProfile){
        return repository.save(userProfile);
    }
}