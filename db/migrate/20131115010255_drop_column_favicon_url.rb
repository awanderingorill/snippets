class DropColumnFaviconUrl < ActiveRecord::Migration
  def change
    remove_column :snippets, :favicon_url
  end
end
