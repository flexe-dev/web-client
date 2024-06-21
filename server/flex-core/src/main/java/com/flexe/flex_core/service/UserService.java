package com.flexe.flex_core.service;

import com.flexe.flex_core.entity.user.User;
import com.flexe.flex_core.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findUserById(String userId){
        return userRepository.findById(userId).orElse(null);
    }

    public User findUserByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public User findUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public User completeOnboarding(String userId, String username, String name, String image){
        User user = userRepository.findById(userId).orElse(null);
        if(user == null){
            return null;
        }

        user.setUsername(username);
        user.setName(name);
        user.setImage(image);
        return userRepository.save(user);

    }

    public User updateUser(User user){
        return userRepository.save(user);
    }
}