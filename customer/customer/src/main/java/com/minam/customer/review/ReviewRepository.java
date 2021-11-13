package com.minam.customer.review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// review 테이블에 접근하는 객체
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

}
