package com.flexe.flex_core.controller;

import com.flexe.flex_core.entity.response.ErrorMessageResponse;
import com.flexe.flex_core.entity.user.UserAccount;
import com.flexe.flex_core.entity.user.UserProfile;
import com.flexe.flex_core.entity.user.User;
import com.flexe.flex_core.service.user.UserService;
import io.sentry.Sentry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/profile/create/{userId}")
    public ResponseEntity<UserProfile> createProfile(@PathVariable String userId){
        try{

        UserProfile profile = userService.findProfile(userId);
        if(profile == null){
            UserProfile newProfile = userService.createProfile(userId);
            return ResponseEntity.ok(newProfile);
        }
        return ResponseEntity.ok(profile);
        }
        catch (Exception e){
            Sentry.captureException(e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/find/id/{id}")
    public ResponseEntity<User> findUserById(@PathVariable String id){

            User user = userService.findUserById(id);
            if(user == null){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
            }
            return ResponseEntity.ok(user);
    }

    @GetMapping("/find/username/{username}")
    @ResponseBody
    public ResponseEntity<User> findUserByUsername(@PathVariable String username){
        User user = userService.findUserByUsername(username);
        if(user == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/find/email/{email}")
    public ResponseEntity<User> findUserByEmail(@PathVariable String email){
            User user = userService.findUserByEmail(email);
            if(user == null){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
            }
            return ResponseEntity.ok(user);
    }

    @GetMapping("/profile/find/{userId}")
    public UserProfile findProfileFromUser(@PathVariable String userId){
        return userService.findProfile(userId);
    }

    @GetMapping("/account/find/{userId}")
    public ResponseEntity<UserAccount> findUserAccount(@PathVariable String userId){
        UserAccount account = userService.findUserAccount(userId);
        if(account == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return ResponseEntity.ok(account);
    }

    @GetMapping("/account/find/username/{username}")
    public ResponseEntity<UserAccount> findUserAccountByUsername(@PathVariable String username){
        UserAccount account = userService.findUserAccountByUsername(username);
        if(account == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return ResponseEntity.ok(account);
    }

    @PutMapping("/details/update")
    @ResponseBody
    public ResponseEntity<User> updateUserDetails(@RequestBody User user){
        try{
            User updatedUser = userService.updateUser(user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e){
            Sentry.captureException(e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/account/update")
    @ResponseBody
    public ResponseEntity<UserAccount> updateUserAccount(@RequestBody UserAccount account) {
        try {
            UserAccount updatedAccount = userService.updateUserAccount(account);
            return ResponseEntity.ok(updatedAccount);
        } catch (Exception e){
            Sentry.captureException(e);
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("/error")
    @ResponseBody
    public void throwError(){
        try {
            throw new Exception("This is a test.");
        } catch (Exception e) {
            Sentry.captureException(e);
        }
    }
}

