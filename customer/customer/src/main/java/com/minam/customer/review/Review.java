package com.minam.customer.review;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

// Spring Data JPA (자바 영속화 API)
@Entity
public class Review {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String title;
	private long createdTime;
	@Column(columnDefinition = "VARCHAR(1000)")
	private String description;
	@Column(columnDefinition = "TEXT")
	private String reviewPhotoUrl;
	private String fileType;
	private String fileName;
	private String clinic;
	private String price;
	private String keyword;
}
