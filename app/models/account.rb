class Account < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :validatable

  validates_presence_of :address

  after_create :start_locate_job
  after_update :start_locate_job_after_change

  def start_locate_job
    self.update(located: false, change_processed: false, address_lat: nil, address_lng: nil)
    LocateAddressJob.perform_later(self)
  end

  def start_locate_job_after_change
    if saved_change_to_address?
      start_locate_job
    end
  end
end
