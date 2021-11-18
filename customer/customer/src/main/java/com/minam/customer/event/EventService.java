package com.minam.customer.event;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {
	private RabbitTemplate rabbit;

	EventRepository repo;

	@Autowired
	public EventService(EventRepository repo, RabbitTemplate rabbit) {
		this.repo = repo;
		this.rabbit = rabbit;
	}

	@RabbitListener(queues = "test.hello.1")
	public void receiveEvent(Event event) {
		System.out.println(event);
		saveEvent(event);
	}

	public Event saveEvent(Event resEvent) {
		Event event = Event.builder().title(resEvent.getTitle()).description(resEvent.getDescription())
				.clinic(resEvent.getClinic()).keyword(resEvent.getKeyword()).price(resEvent.getPrice())
				.photoUrl(resEvent.getPhotoUrl()).fileType(resEvent.getFileType()).fileName(resEvent.getFileName())
				.createdTime(resEvent.getCreatedTime()).build();
		repo.save(event);
		return event;
	}
}
