package com.minam.customer.review;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReviewController {

	public SortedMap<Long, Review> reviews = Collections
			.synchronizedSortedMap(new TreeMap<Long, Review>(Collections.reverseOrder()));

	public AtomicLong maxId = new AtomicLong();

	// review 목록조회
	@GetMapping(value = "/reviews")
	public List<Review> getReviews() {
		return new ArrayList<Review>(reviews.values());
	}

	// review 1건 추가
	@PostMapping(value = "/reviews")
	public Review addReview(@RequestBody Review review, HttpServletResponse res) {
		if (review.getTitle() == null || review.getTitle().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// id값 생성
		Long currentId = maxId.incrementAndGet();
		Review reviewItem = Review.builder().id(currentId).title(review.getTitle()).description(review.getDescription())
				.reviewPhotoUrl(review.getReviewPhotoUrl()).fileType(review.getFileType())
				.fileName(review.getFileName()).clinic(review.getClinic()).price(review.getPrice())
				.keyword(review.getKeyword()).createdTime(new Date().getTime()).build();

		// review 목록객체 추가
		reviews.put(currentId, reviewItem);

		return reviewItem;
	}

	// review 1건 삭제
	@DeleteMapping(value = "/reviews/{id}")
	public boolean removeReivew(@PathVariable long id, HttpServletResponse res) {

		Review review = reviews.get(Long.valueOf(id));
		if (review == null) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}
		reviews.remove(Long.valueOf(id));

		return true;

	}

	// review 1건 수정
	@PutMapping(value = "/reviews/{id}")
	public Review modifyReivew(@PathVariable long id, @RequestBody Review review, HttpServletResponse res) {

		Review findItem = reviews.get(Long.valueOf(id));
		if (findItem == null) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

		findItem.setTitle(review.getTitle());
		findItem.setDescription(review.getDescription());
		findItem.setReviewPhotoUrl(review.getReviewPhotoUrl());
		findItem.setFileType(review.getFileType());
		findItem.setFileName(review.getFileName());
		findItem.setClinic(review.getClinic());
		findItem.setPrice(review.getPrice());
		findItem.setKeyword(review.getKeyword());
		return findItem;
	}

}
