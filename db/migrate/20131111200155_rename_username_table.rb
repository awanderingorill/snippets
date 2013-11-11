class RenameUsernameTable < ActiveRecord::Migration
  def self.up
    rename_column :users, :username, :name
  end

  def down
  end
end
