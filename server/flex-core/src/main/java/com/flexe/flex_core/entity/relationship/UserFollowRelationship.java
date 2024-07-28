package com.flexe.flex_core.entity.relationship;

import com.flexe.flex_core.entity.nodes.user.UserNode;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import java.util.Date;

@RelationshipProperties
public class UserFollowRelationship {
    @Id
    @GeneratedValue
    private Long id;

    private Date timestamp;

    @TargetNode
    private UserNode user;

    public UserFollowRelationship(){}

    public UserFollowRelationship(UserNode user){
        this.user = user;
        this.timestamp = new Date();
    }

    public Long getId() {
        return id;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public UserNode getUser() {
        return user;
    }

}
