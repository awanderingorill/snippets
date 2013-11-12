# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Snippet.delete_all
User.delete_all

User.create(name: 'Diego', password: 'snippets', password_confirmation: 'snippets',email: 'diego@gmail.com')
User.create(name: 'Ana', password: 'xander',password_confirmation: 'xander', email: 'ana@gmail.com')
User.create(name: 'Amy', password: 'heyyyyy', password_confirmation: 'heyyyyy', email: 'nyc@gmail.com')
Snippet.create(body: 'This is awesome', source: 'www.nytimes.com', user_id: 1, tag_list: 'politics, history')
Snippet.create(body: 'This is yumyum', source: 'www.nytimes.com', user_id: 1, tag_list: 'yumyum')
Snippet.create(body: 'This is food and politics', source: 'www.nytimes.com', user_id: 2, tag_list: 'yumyum, politics')
Snippet.create(body: 'This is democracy', source: 'www.nytimes.com', user_id: 3, tag_list: 'history')