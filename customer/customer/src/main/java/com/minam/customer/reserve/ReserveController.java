package com.minam.customer.reserve;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.minam.customer.lib.TextProcesser;

@RestController
public class ReserveController {
	private ReserveRepository repo;

	// 의존성 주입(Dependency)
	@Autowired
	public ReserveController(ReserveRepository repo) {
		this.repo = repo;
	}

	// reserve 목록조회
	@GetMapping(value = "/reserves")
	public List<Reserve> getReviews() throws InterruptedException {
		System.out.println("---리뷰나와라");
		// id컬럼 역정렬
		return repo.findAll(Sort.by("id").descending());
	}

	// reserve 1건 추가
	@PostMapping(value = "/reserves")
	public Reserve addReserve(@RequestBody Reserve reserve, HttpServletResponse res) throws InterruptedException {
		if ((TextProcesser.isEmpyText(reserve.getRezName())
				|| (TextProcesser.isEmpyText(reserve.getRezPhone()) || (TextProcesser.isEmpyText(reserve.getSeeDate())
						|| (TextProcesser.isEmpyText(reserve.getSeeTime())))))) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 객체 생성
		Reserve reserveItem = Reserve.builder().rezName(reserve.getRezName()).rezPhone(reserve.getRezPhone())
				.seeDate(reserve.getSeeDate()).seeTime(reserve.getSeeTime()).eventId(reserve.getEventId()).build();

		// reserve 목록객체 추가
		Reserve reserveSaved = repo.save(reserveItem);

		// 리소스 생성됨
		res.setStatus(HttpServletResponse.SC_CREATED);

		// 추가된 객체를 반환
		return reserveSaved;
	}

}
