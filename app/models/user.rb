# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  username   :string(255)
#  email      :string(255)
#  password   :string(255)
#  country    :string(255)      default("usa")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ActiveRecord::Base
  attr_accessible :username, :email, :password, :password_confirmation, :country
  #no devise library yet.
  has_secure_password
  validates :email, :presence => false, :uniqueness => true
  validates :password, :password_confirmation, :presence => true, :length => {in: 6..20}

  #acts_as_tagger looks very useful but when I was testing it did not seem to yield anything.
  #@some_user.tag(@some_photo, :with => "politics") <-- not returning anything.
  acts_as_tagger
  has_many :snippets, :dependent => :destroy
end