package com.flexe.flex_core.controller;

import com.flexe.flex_core.entity.user.UserAccount;
import com.flexe.flex_core.entity.user.UserProfile;
import com.flexe.flex_core.entity.user.User;
import com.flexe.flex_core.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/profile/create")
    public UserProfile createProfile(@RequestBody String userId){
        return userService.createProfile(userId);
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
        return userService.findProfile(userId);
    }

    @GetMapping("/account/find/{userId}")
    public ResponseEntity<UserAccount> findUserAccount(@PathVariable String userId){
        UserAccount account = userService.findUserAccount(userId);
        if(account == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(account);
    }

    @GetMapping("/account/find/username/{username}")
    public ResponseEntity<UserAccount> findUserAccountByUsername(@PathVariable String username){
        UserAccount account = userService.findUserAccountByUsername(username);
        if(account == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(account);
    }

    @PutMapping("/profile/update")
    public UserProfile updateUserProfile(@RequestBody UserProfile profile) {
        return userService.updateProfile(profile);
    }

    @PutMapping("/user/update")
    public User updateUserDetails(@RequestBody User user){
        return userService.updateUser(user);
    }

    @PutMapping("/account/update")
    public UserAccount updateUserAccount(@RequestBody UserAccount account){
        return account;
    }
}