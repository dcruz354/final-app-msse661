/**
 * AJAX add new estimates to estimate list on save.
 */
const doAddEstimate = async (e) => {
    e.preventDefault();
  
    const estimateInput = document.getElementById('formInputJobNumber');
    const job_number = estimateInput.value;
    const pipeSizeSelect = document.getElementById('formSelectPipeSize');
    const options = pipeSizeSelect.options;
    const selectedIndex = pipeSizeSelect.selectedIndex;
    const pipe_size = options[selectedIndex].text;
    const estimateInput1 = document.getElementById('formInputTotalNumHoles');
    const total_num_holes = estimateInput1.value;
  
    if (!job_number) {
      alert('Please enter a job number.');
      return;
    }
    if (!total_num_holes) {
        alert('Please enter number of holes.');
        return;
      }
  
    const res = await doAddEstimate({ job_number, pipe_size, total_num_holes });
  
    if (res !== null) {
      inst.generateEstimate();
    }
    estimateInput.value = '';
    estimateInput1.value = '';
  };
  