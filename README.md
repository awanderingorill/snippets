<!-- README at the base of your GitHub repo for people looking at your code. Describe the project, the purpose, and an outline of how to read your repo. -->

Snippets
========

A Google Chrome extension that lets you grab and save snippets of text from the web.

###Libraries
- jQuery

###Gems
- Devise
- Acts-as-Taggable-On

###Models
- User
- Snippet
- Tag

###Routes
- index: signup, login, DOWNLOAD
- user profile: list of snippets, list of tags
--CRUD will be in pop-ups accessed within the user profile, so the app will be single-page

###MVP:
	- chrome extension that posts highlighted text a user’s profile
		- authenticates user
		- user profile filters snippets by tag name
	- user can create, read, update, and delete snippets from a single-page app on our website