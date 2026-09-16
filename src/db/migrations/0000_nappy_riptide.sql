CREATE TABLE `otp_codes` (
	`id` text PRIMARY KEY NOT NULL,
	`phone` text NOT NULL,
	`code` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`token` text NOT NULL,
	`user_agent` text,
	`ip_address` text,
	`last_activity` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`phone` text NOT NULL,
	`email` text,
	`password` text,
	`avatar` text,
	`role` text DEFAULT 'user' NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_phone_unique` ON `users` (`phone`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);