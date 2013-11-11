# == Schema Information
#
# Table name: snippets
#
#  id         :integer          not null, primary key
#  body       :text
#  source     :text
#  user_id    :integer
#  tag_list   :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Snippet < ActiveRecord::Base
  attr_accessible :body, :source, :user_id, :tag_list
  #taglist stands for all the tags associated with the snippets["politics","history"]
  #@snippet.tag_list = "politics, history"
  belongs_to :user
  acts_as_taggable_on :tags
  # scope to order @snippet.tagged_with("history").by_join_date
  scope :by_join_date, order("created_at DESC")
  # tagged_with functionality can also be used like this=>
  # @snippet.tagged_with(["history","politics"], :match_all => true// :any =>true
end
