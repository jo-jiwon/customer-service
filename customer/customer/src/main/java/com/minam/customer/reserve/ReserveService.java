package com.minam.customer.reserve;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReserveService {
	private RabbitTemplate rabbit;

	ReserveRepository repo;

	@Autowired
	public ReserveService(ReserveRepository repo, RabbitTemplate rabbit) {
		this.repo = repo;
		this.rabbit = rabbit;
	}

	public void sendReserve(Reserve reserve) {
		System.out.println(reserve);
		rabbit.convertAndSend("test.hello.2", reserve);
		rabbit.convertAndSend("test.hello.3", reserve);
	}

}
