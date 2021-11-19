package com.minam.customer.event;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EventResponse {
	private String title;
	private String description;
	private String clinic;
	private String keyword;
	private String price;

	private String photoUrl;
	private String fileType;
	private String fileName;

	private Long createdTime;
}
