package com.minam.customer.review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review {
	private long id;
	private String title;
	private long createdTime;
	private String description;
	private String reviewPhotoUrl;
	private String fileType;
	private String fileName;
	private String clinic;
	private String price;
	private String keyword;
}
