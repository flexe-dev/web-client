package com.flexe.flex_core.repository.user;

import com.flexe.flex_core.entity.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    @Query("{ 'username' : ?0 }")
    User findByUsername(String username);

    @Query("{ 'email' : ?0 }")
    User findByEmail(String email);

}