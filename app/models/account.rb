class Account < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :validatable

  validates_presence_of :address_raw

  after_update :start_locate_job_after_change

  def start_locate_job_after_change
    if saved_change_to_address_raw?
      self.update(located: false)
      LocateAddressJob.perform_later(self)
    end
  end

end
