package com.flexe.flex_core.repository.user;

import com.flexe.flex_core.entity.user.UserProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends MongoRepository<UserProfile, String> {
    @Query("{ 'userId' : ObjectId(?0) }")
    UserProfile findByUserId(String userId);
}