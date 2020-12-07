MySQL Database Schema
Tables for our database follow the example schemas below. Each table represents a dataset by which we can access via our API.

Note: not every table we create for an API needs to be exposed.

Users Table Schema
Auth queries peform tasks against the users table.

The users table will be represented by the following Schema:

Column	    Description
user_id	    Unique identifier for our user besides their name.
username	User's name
password	User's password (non-unique)
email       User's email

Example:

+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| user_id  | int          | NO   | PRI | NULL    | auto_increment |
| username | varchar(255) | NO   | UNI | NULL    |                |
| email    | varchar(255) | NO   |     | NULL    |                |
| password | varchar(255) | NO   |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+

Estimates Table Schema

The estimates table will be represented by the following Schema:

Column              Description
estimate_id	        Unique identifier for our user besides their name.
user_id	            User's name
job_number	        User's password (non-unique)
pipe_size           User's email
total_num_holes     Total number of holes
total_savings       Total savings

Example:

+-----------------+------+------+-----+---------+----------------+
| Field           | Type | Null | Key | Default | Extra          |
+-----------------+------+------+-----+---------+----------------+
| estimate_id     | int  | NO   | PRI | NULL    | auto_increment |
| user_id         | int  | NO   | MUL | NULL    |                |
| job_number      | int  | NO   |     | NULL    |                |
| pipe_size       | int  | NO   |     | NULL    |                |
| total_num_holes | int  | NO   |     | NULL    |                |
| total_savings   | int  | YES  |     | NULL    |                |
+-----------------+------+------+-----+---------+----------------+