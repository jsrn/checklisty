class CreateChecklists < ActiveRecord::Migration
  def change
    create_table :checklists do |t|
      t.string      :token
      t.text        :list_json
      t.timestamps
    end
  end
end
