$(function feedback() {
  /**
   * Updates the DOM
   * @param {*} data XHR result
   */
  function updateFeedback(data) {
    const render = [];
    // Reset all status messages
    $('.feedback-status').empty();

    // All went well
    if (!data.errors && data.feedback) {
      // The input was valid - reset the form
      $('.feedback-form').trigger('reset');

      $.each(data.feedback, function createHtml(key, item) {
        render.push(`
          <div class="feedback-item item-list media-list">
            <div class="feedback-item media">
              <div class="feedback-info media-body">
                <div class="feedback-head">
                  <div class="feedback-title">${item.title}</div>
                  <small>by ${item.name}</small>
                </div>
                <div class="feedback-message">
                  ${item.message}
                </div>
              </div>
            </div>
          </div>
        `);
      });
      // Update feedback-items with what the REST API returned
      $('.feedback-items').html(render.join('\n'));
      // Output the success message
      $('.feedback-status').html(`<div class="alert alert-success">${data.successMessage}</div>`);
    } else {
      // There was an error
      // Create a list of errors
      console.log('Error');
      $.each(data.errors, function createHtml(key, error) {
        render.push(`
          <li>${error.msg}</li>
        `);
      });
      // Set the status message
      $('.feedback-status').html(
        `<div class="alert alert-danger"><ul>${render.join('\n')}</ul></div>`
      );
    }
  }

  /**
   * Attaches to the form and sends the data to our REST endpoint
   */
  $('.feedback-form').submit(function submitFeedback(e) {
    // Prevent the default submit form event
    e.preventDefault();

    // XHR POST request
    $.post(
      '/feedback/api',
      // Gather all data from the form and create a JSON object from it
      {
        name: $('#feedback-form-name').val(),
        email: $('#feedback-form-email').val(),
        title: $('#feedback-form-title').val(),
        message: $('#feedback-form-message').val(),
      },
      // Callback to be called with the data
      updateFeedback
    );
  });
});
