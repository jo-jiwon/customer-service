package com.minam.customer.event;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventController {

	private EventRepository repo;

	// 의존성 주입(Dependency)
	@Autowired
	public EventController(EventRepository repo) {

		this.repo = repo;
	}

	// event 목록조회
	@Cacheable(value = "event-list", key = "'all'")
	@GetMapping(value = "/events")
	public List<Event> getEvents() throws InterruptedException {

		// id컬럼 역정렬
		return repo.findAll(Sort.by("id").descending());
	}

	@GetMapping(value = "/events/{id}")
	public Event getPromo(@PathVariable long id) {
		System.out.println(id);
		return repo.findById(id).orElse(null);
	}

//	// 페이징처리
//	@GetMapping("/events/paging")
//	public Page<Event> getEventsPaging(@RequestParam int page, @RequestParam int size) {
//		return repo.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
//	}

}
