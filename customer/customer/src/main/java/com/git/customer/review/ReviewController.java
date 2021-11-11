package com.git.customer.review;

import java.util.Date;
import java.util.List;
//import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
//import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.git.customer.lib.TextProcesser;

@RestController
public class ReviewController {
	private ReviewRepository repo;
	
	// Autowired 어노테이션은 매개변수나 필드 타입에 맞는 객체를
		// Spring에서 생성하여 주입하여줌(의존성 주입, 의존객체주입, DI, Dependency Injection)
		// Repository 인터페이스 구조에 맞는 객체를 Spring에 생성하여 넣어줌
		@Autowired
		public ReviewController(ReviewRepository repo) {
			this.repo = repo;
		}
		
		@GetMapping(value = "/reviews")
		public List<Review> getReviews() throws InterruptedException {
			// repository.findAll();
			// SELECT * FROM photo;
			// 기본적으로 PK 순정렬(asc, ascending)되고 있는 상황
			// 1 2 3 .....
//			return repo.findAll();

			// id컬럼 역정렬(clusted index)
			// Sort.by("정렬컬럼").desceding() 역정렬
			// Sort.by("정렬컬럼").ascending() 순정렬
			return repo.findAll(Sort.by("id").descending());
		}
		
		// 예) 한페이지 2개, 1번째 페이지
		// 예) GET /photos/paging?page=0&size=2
		@GetMapping("/reviews/paging")
		public Page<Review> getReviewsPaging(@RequestParam int page, @RequestParam int size) {
			// findAll(Pageable page)
			// findAll(PageRequest.of(page, size, Sort sort));
			return repo.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
		}
		
		@PostMapping(value = "/reviews")
		public Review addReview(@RequestBody Review review, HttpServletResponse res) throws InterruptedException {
			// 타이틀이 빈값
			if (TextProcesser.isEmpyText(review.getTitle())) {
				res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				return null;
			}

			// 파일URL이 빈값
			if (TextProcesser.isEmpyText(review.getReviewPhotoUrl())) {
				res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				return null;
			}

			// 객체 생성
			Review reviewItem = Review.builder().title(review.getTitle())
					.description(TextProcesser.getPlainText(review.getDescription())).reviewPhotoUrl(review.getReviewPhotoUrl())
					.fileType(review.getFileType()).fileName(review.getFileType()).clinic(review.getClinic()).price(review.getPrice()).keyword(review.getKeyword()).createdTime(new Date().getTime()).build();

			// repository.save(entity)
			// insert into photo(...) values(...)
			Review reviewSaved = repo.save(reviewItem);

			// 리소스 생성됨
			res.setStatus(HttpServletResponse.SC_CREATED);

			// 추가된 객체를 반환
			return reviewSaved;
		}
		
//		@DeleteMapping(value = "/reviews/{id}")
//		public boolean removeReview(@PathVariable long id, HttpServletResponse res) throws InterruptedException {
////			Thread.sleep(5000);
//
//			// id에 해당하는 객체가 없으면
//			// Optional null-safe, 자바 1.8 나온 방식
//			// repository.findBy(id)
//			// select * from photo where id = ?;
//			Optional<Review> review = repo.findById(id);
//			if (review.isEmpty()) {
//				res.setStatus(HttpServletResponse.SC_NOT_FOUND);
//				return false;
//			}
//
//			// 삭제 수행
//			// repository.deletebyId(id)
//			// delete from photo where id = ?
//			repo.deleteById(id);
//
//			return true;
//		}
//
//		@PutMapping(value = "/photos/{id}")
//		public Review modifyPhoto(@PathVariable long id, @RequestBody Review review, HttpServletResponse res)
//				throws InterruptedException {
//
//			// id에 해당하는 객체가 없으면
//			Optional<Review> reviewItem = repo.findById(id);
//			if (reviewItem.isEmpty()) {
//				res.setStatus(HttpServletResponse.SC_NOT_FOUND);
//				return null;
//			}
//
//			// 타이틀이 빈값
//			if (TextProcesser.isEmpyText(review.getTitle())) {
//				res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//				return null;
//			}
//
//			// 파일URL이 빈값
//			if (TextProcesser.isEmpyText(review.getReviewPhotoUrl())) {
//				res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//				return null;
//			}
//
//			Review reviewToSave = reviewItem.get();
//
//			reviewToSave.setTitle(photo.getTitle());
//			reviewToSave.setDescription(TextProcesser.getPlainText(photo.getDescription()));
//			reviewToSave.setPhotoUrl(photo.getPhotoUrl());
//			reviewToSave.setFileType(photo.getFileType());
//			reviewToSave.setFileName(photo.getFileName());
//
//			// repository.save(entity)
//			// id가 있으면 UPDATE, 없으면 INSERT
//			// UPDATE
//			// SET title=?, descript=?,......
//			// WHERE id = ?
//			Photo photoSaved = repo.save(photoToSave);
//
//			return photoSaved;
//		}
		
}
