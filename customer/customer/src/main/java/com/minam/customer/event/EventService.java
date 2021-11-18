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
	}
}
