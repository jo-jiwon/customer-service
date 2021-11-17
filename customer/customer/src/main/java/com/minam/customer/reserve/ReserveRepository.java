package com.minam.customer.reserve;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// review 테이블에 접근하는 객체
@Repository
public interface ReserveRepository extends JpaRepository<Reserve, Long> {

}
