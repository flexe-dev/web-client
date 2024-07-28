package com.flexe.flex_core.repository.post;

import com.flexe.flex_core.entity.nodes.posts.PostNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface PostNodeRepository extends Neo4jRepository<PostNode, String> {
}
