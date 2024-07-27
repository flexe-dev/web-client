package com.flexe.flex_core.repository.user;

import com.flexe.flex_core.entity.nodes.user.UserNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface UserNodeRepository extends Neo4jRepository<UserNode, String> {

}
