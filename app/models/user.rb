# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string(255)
#  email           :string(255)
#  password_digest :string(255)
#  country         :string(255)      default("usa")
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  #validation
  before_save do
    self.email = self.email.downcase
  end
  #validation
  attr_accessible :name, :email, :password, :password_confirmation, :country
  #no devise library yet.
  has_secure_password
  validates :email, :presence => false, :uniqueness => true
  validates :password, :password_confirmation, :presence => true

  #acts_as_tagger looks very useful but when I was testing it did not seem to yield anything.
  #@some_user.tag(@some_photo, :with => "politics") <-- not returning anything.
  acts_as_tagger
  has_many :snippets, :dependent => :destroy
end
