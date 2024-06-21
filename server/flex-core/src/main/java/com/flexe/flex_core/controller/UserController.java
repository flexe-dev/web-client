package com.flexe.flex_core.controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.flexe.flex_core.entity.user.UserProfile;
import com.flexe.flex_core.entity.user.User;
import com.flexe.flex_core.service.UserProfileService;
import com.flexe.flex_core.service.UserService;
import org.bson.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserProfileService userProfileService;

    @PostMapping("/profile/create")
    public UserProfile createProfile(@RequestBody String userId){
        return userProfileService.createProfile(userId);
    }

    @GetMapping("/find/id/{id}")
    public User findUserById(@PathVariable String id){
        return userService.findUserById(id);
    }

    @GetMapping("/find/username/{username}")
    public User findUserByUsername(@PathVariable String username){
        return userService.findUserByUsername(username);
    }

    @GetMapping("/find/email/{email}")
    public User findUserByEmail(@PathVariable String email){
        return userService.findUserByEmail(email);
    }

    @GetMapping("/profile/find/{userId}")
    public UserProfile findProfileFromUser(@PathVariable String userId){
        return userProfileService.findProfile(userId);
    }

    @PutMapping("/profile/update")
    public Boolean updateProfile(@RequestBody JsonObject request) {
        JsonObject yes = request;
        String No = "no";
        return true;
//        User updatedUser = userService.updateUser(user);
//        UserProfile updatedProfile = userProfileService.updateProfile(userProfile);
//        return updatedUser != null && updatedProfile != null;
    }

    @PostMapping("/onboard/complete")
    public User completeOnboarding(@RequestBody String userID, @RequestBody String username, @RequestBody String name, @RequestBody String image){
        return userService.completeOnboarding(userID, username, name, image);
    }
}