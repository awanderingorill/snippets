class CreateSnippetsTable < ActiveRecord::Migration
  def change
    create_table :snippets do |t|
      t.text :body
      t.text :source
      t.text :notes
      t.integer :user_id
      t.string :tag_list
      t.timestamps
    end
  end
end
