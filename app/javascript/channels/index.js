// Expose action cable
import * as ActionCable from '@rails/actioncable'
window.App || (window.App = {});
window.App.cable = ActionCable.createConsumer();