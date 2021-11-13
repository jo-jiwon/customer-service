package com.minam.customer.review;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.minam.customer.lib.TextProcesser;

@RestController
public class ReviewController {

	private ReviewRepository repo;

	// 의존성 주입(Dependency)
	@Autowired
	public ReviewController(ReviewRepository repo) {
		this.repo = repo;
	}

	// review 목록조회
	@GetMapping(value = "/reviews")
	public List<Review> getReviews() throws InterruptedException {

		// id컬럼 역정렬
		return repo.findAll(Sort.by("id").descending());
	}

	// 페이징처리
	@GetMapping("/reviews/paging")
	public Page<Review> getReviewsPaging(@RequestParam int page, @RequestParam int size) {
		return repo.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
	}

	// review 1건 추가
	@PostMapping(value = "/reviews")
	public Review addReview(@RequestBody Review review, HttpServletResponse res) throws InterruptedException {
		if ((TextProcesser.isEmpyText(review.getTitle()) || (TextProcesser.isEmpyText(review.getReviewPhotoUrl())
				|| (TextProcesser.isEmpyText(review.getKeyword()) || (TextProcesser.isEmpyText(review.getDescription())
						|| (TextProcesser.isEmpyText(review.getClinic())
								|| (TextProcesser.isEmpyText(review.getPrice())))))))) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 객체 생성
		Review reviewItem = Review.builder().title(review.getTitle()).description(review.getDescription())
				.reviewPhotoUrl(review.getReviewPhotoUrl()).fileType(review.getFileType())
				.fileName(review.getFileName()).clinic(review.getClinic()).price(review.getPrice())
				.keyword(review.getKeyword()).createdTime(new Date().getTime()).build();

		// review 목록객체 추가
		Review reviewSaved = repo.save(reviewItem);

		// 리소스 생성됨
		res.setStatus(HttpServletResponse.SC_CREATED);

		// 추가된 객체를 반환
		return reviewSaved;
	}

	// review 1건 삭제
	@DeleteMapping(value = "/reviews/{id}")
	public boolean removeReivew(@PathVariable long id, HttpServletResponse res) throws InterruptedException {

		// id에 해당하는 객체가 없으면
		Optional<Review> review = repo.findById(id);
		if (review.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		// 삭제 수행
		repo.deleteById(id);

		return true;

	}

	// review 1건 수정
	@PutMapping(value = "/reviews/{id}")
	public Review modifyReivew(@PathVariable long id, @RequestBody Review review, HttpServletResponse res)
			throws InterruptedException {

		// id에 해당하는 객체가 없으면
		Optional<Review> reviewItem = repo.findById(id);
		if (reviewItem.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

		if ((TextProcesser.isEmpyText(review.getTitle()) || (TextProcesser.isEmpyText(review.getReviewPhotoUrl())
				|| (TextProcesser.isEmpyText(review.getDescription()))))) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		Review reviewToSave = reviewItem.get();

		reviewToSave.setTitle(review.getTitle());
		reviewToSave.setDescription(TextProcesser.getPlainText(review.getDescription()));
		reviewToSave.setReviewPhotoUrl(review.getReviewPhotoUrl());
		reviewToSave.setFileType(review.getFileType());
		reviewToSave.setFileName(review.getFileName());
		reviewToSave.setClinic(review.getClinic());
		reviewToSave.setPrice(review.getPrice());
		reviewToSave.setKeyword(review.getKeyword());

		Review reviewSaved = repo.save(reviewToSave);

		return reviewSaved;
	}

}
