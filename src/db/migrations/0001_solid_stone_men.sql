PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_otp_codes` (
	`id` text PRIMARY KEY NOT NULL,
	`phone` text NOT NULL,
	`code` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_otp_codes`("id", "phone", "code", "expires_at", "created_at") SELECT "id", "phone", "code", "expires_at", "created_at" FROM `otp_codes`;--> statement-breakpoint
DROP TABLE `otp_codes`;--> statement-breakpoint
ALTER TABLE `__new_otp_codes` RENAME TO `otp_codes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;